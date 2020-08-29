import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { EditStoreConfigComponent } from '../edit-store-config/edit-store-config.component';
@Component({
  selector: 'app-store-config',
  templateUrl: './store-config.component.html',
  styleUrls: ['./store-config.component.css']
})
export class StoreConfigComponent implements OnInit {
  store: any;
  constructor(
    private snackBar: MatSnackBar,
    private product: ProductService,
    private spinner: NgxSpinnerService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
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
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
    this.fetch();
  }
  fetch() {
    this.spinner.show();
    this.product.getStore(localStorage.getItem('store')).subscribe(res => {
      this.store = res;
      this.spinner.hide();
    });
  }

  edit() {
    this.bottomSheet.open(EditStoreConfigComponent, {
      data: { store: this.store },
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

}
