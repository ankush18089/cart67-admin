import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditDashboardComponent } from '../edit-dashboard/edit-dashboard.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'active', 'type', 'sequence', 'action'];
  result: any[] = [];
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private auth: AuthService,
    private product: ProductService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

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
    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
    this.fetch();
  }

  edit(data: any): void {
    this.bottomSheet.open(EditDashboardComponent, {
      data: { action: 'update', dashboard: data },
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
    this.product.deleteDashboardItem(id.toString()).subscribe(res => {
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
    const offer = {
      item: {
        type: 'Collection'
      }
    }
    this.bottomSheet.open(EditDashboardComponent, {
      data: {
        action: 'add', dashboard: offer
      },
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
  fetch() {
    this.spinner.show();
    this.product.getDashboardItems().subscribe((res: any[]) => {
      this.result = res;
      this.spinner.hide();
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }

  fetch1() {
    this.snackBar.openFromComponent(PopupmessageComponent, {
      duration: 2 * 1000,
      data: { data: 'Please use edit option to update this' }
    });
    this.fetch();
  }
}
