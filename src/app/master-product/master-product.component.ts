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
@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css']
})
export class MasterProductComponent implements OnInit {
  products: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'picture', 'variants', 'action'];
  constructor(
    private spinner: NgxSpinnerService,
     private snackBar: MatSnackBar,
     private product: ProductService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.product.getMasterProducts('0', '5').subscribe(res => {
      this.spinner.hide();
      this.products = res['content'];
      this.paginator.length = res['totalElements'];
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });

    this.product.getUser().subscribe(user => {
      this.spinner.hide();
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });

    this.product.getStores().subscribe(res => {
      this.spinner.hide();
      this.product.stores.next(res['content']);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }
  fetch() {
    this.product.getMasterProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(res => {
      this.products = res['content'];
      this.spinner.hide();
      this.paginator.length = res['totalElements'];
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }
  add(product: any) {
    this.product.addProductToSore(JSON.stringify(product)).subscribe(res => {
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Added  successfully'}
      });
    })
  }

}