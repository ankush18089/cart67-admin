import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'picture', 'action'];
  result: any[];
  myForm = this.fb.group({ query: [''] });
  value: any;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private auth: AuthService,
    private product: ProductService,
    private router: Router,

    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (localStorage.getItem('store') === 'none' || !localStorage.getItem('store')) {
      this.router.navigate(['/nostore']);
      return;
    }
    this.product.storeId.next(localStorage.getItem('store'));
    this.product.products.subscribe(res => {
      this.result = res;
    })

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    });
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });

    this.product.getProducts('0', '10', '').subscribe(res => {
      this.result = res['content'];
      this.product.products.next(res['content']);
      this.paginator.length = res['totalElements'];
    });
  }
  fetch() {
    this.myForm.get('query').setValue('');
    this.product.getProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString(), '').subscribe(res => {
      this.result = res['content'];
      this.paginator.length = res['totalElements'];
    });
  }

  edit(varient: any, name: string): void {
    this.bottomSheet.open(EditproductComponent, {
      data: { varient: varient, name: name },
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
    this.product.removeFromStore(id).subscribe(res => {
      if (res) {
        this.fetch();
        this.snackBar.openFromComponent(PopupmessageComponent, {
          duration: 2 * 1000,
          data: { data: 'removed  successfully' }
        });
      }
    });
  }



  logout() {
    this.auth.doLogoutUser();
    this.router.navigate(['/login']);
  }
  find() {
    this.product.getProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString(), this.myForm.get('query').value).subscribe(res => {
      this.result = res['content'];
      this.paginator.length = res['totalElements']
    });
  }

}
