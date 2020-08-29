import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditproductComponent } from '../editproduct/editproduct.component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditProductInfoComponent } from '../edit-product-info/edit-product-info.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'picture', 'category', 'tags', 'active', 'varient', 'action'];
  result: any[] = [];
  myForm = this.fb.group({ query: [''] });
  value: any;
  length: number;
  isLoading=true;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private auth: AuthService,
    private product: ProductService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (localStorage.getItem('store') === 'none' || !localStorage.getItem('store')) {
      this.router.navigate(['/nostore']);
      return;
    }
    this.product.productsLength.subscribe(res => {
      this.length = res;
    });
    this.spinner.show();
    this.product.storeId.next(localStorage.getItem('store'));
    this.product.products.subscribe(res => {
      this.result = res;
    });

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    });
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });
    this.product.getProducts('0', '5', '').subscribe(res => {
      this.spinner.hide();
      this.result = res['content'];
      this.product.products.next(res['content']);
      this.length = res['totalElements'];
      this.isLoading=false;
    }, error => {
      this.isLoading=false;
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }
  fetch() {
    this.spinner.show();
    this.isLoading=true;
    this.myForm.get('query').setValue('');
    this.product.getProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString(), '').subscribe(res => {
      this.result = res['content'];
      this.length = res['totalElements'];
      this.spinner.hide();
      this.isLoading=false;
    }, error => {
      this.spinner.hide();
      this.isLoading=false;
      console.log('error occurred while getting data from server  : ' + error.status);
    });
  }

  slide() {
    this.snackBar.openFromComponent(PopupmessageComponent, {
      duration: 4 * 1000,
      data: { data: 'Please use edit option to update this' }
    });
    this.fetch();
  }
  clear() {
    this.myForm.get('query').setValue('');
    this.isLoading=true;
    this.product.getProducts('0', '5', '').subscribe(res => {
      this.spinner.hide();
      this.result = res['content'];
      this.product.products.next(res['content']);
      this.length = res['totalElements'];
      this.isLoading=false;
    }, error => {
      this.isLoading=false;
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
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
  editProduct(product: any) {
    this.bottomSheet.open(EditProductInfoComponent, {
      data: { product: product },
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
    }, error => {
      console.log('error occurred while getting data from server   : ' + error.status);
    });
  }



  logout() {
    this.auth.doLogoutUser();
    this.router.navigate(['/login']);
  }
  find() {
    if (this.myForm.get('query').value === '') {
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Please enter search value' }
      });
      return;
    }
    this.spinner.show();
    this.isLoading=true;
    this.product.getProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString(), this.myForm.get('query').value).subscribe(res => {
      this.result = res['content'];
      this.length = res['totalElements'];
      this.spinner.hide();
      this.isLoading=false;
    }, error => {
      this.isLoading=false;
      console.log('error occurred while getting data from server   : ' + error.status);
      this.spinner.hide();
    });
  }

}
