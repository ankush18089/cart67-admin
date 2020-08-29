import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'picture','active','sequence', 'action'];
  result: any[]=[];
  length: number;
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
    this.product.getCollections('0', '10').subscribe(res => {
      this.spinner.hide();
      this.result = res['content'];
      this.length = res['totalElements'];
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }

  fetch() {
    this.spinner.show();
    this.product.getCollections(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(res => {
      this.result = res['content'];
      this.length = res['totalElements'];
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log('error occurred while getting data from server  : ' + error.status);
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
    this.bottomSheet.open(EditCollectionComponent, {
      data: { action: 'update', collection: data },
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
    this.product.deleteCollection(id).subscribe(res => {
      if(res){
        this.fetch();
        this.snackBar.openFromComponent(PopupmessageComponent, {
          duration: 2 * 1000,
          data: { data: 'removed  successfully' }
        });
      }  
    }, error => {
      console.log('error occurred while getting data from server   : ' + error.status);
    });
  }
  add() {
    this.bottomSheet.open(EditCollectionComponent, {
      data: { action: 'add', collection: null },
      panelClass: 'custom-width',
    }).afterDismissed().subscribe(res => {
      if (res) {
        this.fetch();
        this.snackBar.openFromComponent(PopupmessageComponent, {
          duration: 2 * 1000,
          data: { data: 'added  successfully' }
        });
      }
    });
  }

}
