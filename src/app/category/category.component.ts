import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'active', 'sequence', 'bg_color', 'action'];
  result: any[] = [];
  length: number;
  isLoading=true;
  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private product: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (localStorage.getItem('store') === 'none' || !localStorage.getItem('store')) {
      this.router.navigate(['/nostore']);
      return;
    }
    this.spinner.show();
    this.product.storeId.next(localStorage.getItem('store'));
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    });
    this.fetch();
  }
  fetch() {
    this.isLoading=true;
    this.product.getCategories().subscribe((res: any[]) => {
      this.spinner.hide();
      this.result = res;
      this.isLoading=false;
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
      this.isLoading=false;
    });
  }
  fetch1() {
    this.snackBar.openFromComponent(PopupmessageComponent, {
      duration: 2 * 1000,
      data: { data: 'Please use edit option to update this' }
    });
    this.fetch();
  }
  edit(data: any): void {
    this.bottomSheet.open(EditCategoryComponent, {
      data: { action: 'update', category: data },
      panelClass: 'custom-width',
    }).afterDismissed().subscribe(res => {
      if (res) {
        this.fetch();
        this.snackBar.openFromComponent(PopupmessageComponent, {
          duration: 2 * 1000,
          data: { data: 'updated  successfully' }
        });
      }
    });
  }
  delete(id: number) {
    this.product.removeCategoryFromStore(id).subscribe(() => {
      this.fetch();
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'removed  successfully' }
      });
    }, error => {
      console.log('error occurred while getting data from server   : ' + error.status);
    });
  }
  add() {
    alert('not implemented');
  }

}
