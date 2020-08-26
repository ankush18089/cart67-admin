import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddOfferComponent } from '../add-offer/add-offer.component';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: any;
  displayedColumns: string[] = ['name', 'picture', 'type', 'subText', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  length = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private bottomSheet: MatBottomSheet,
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
    this.product.storeId.next(localStorage.getItem('store'));
    this.spinner.show();
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
    this.product.getOffers('0', '6').subscribe(res => {
      this.offers = res['content'];
      this.length = res['totalElements'];
      this.spinner.hide();
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }
  fetch1() {
    this.product.getOffers(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(res => {
      this.offers = res['content'];
      this.length = res['totalElements'];
      this.spinner.hide();
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }

  add() {
    const offer = {
      data: {
        type: 'Information'
      }
    }
    this.bottomSheet.open(AddOfferComponent, {
      data: { action: 'add', offer: offer },
      panelClass: 'custom-width',
    }).afterDismissed().subscribe(res => {
      if (res) {
        this.fetch();
      }
    });
  }
  delete(id: number) {
    this.product.deleteOffer(id).subscribe(() => {
      console.log('deleted');
      this.fetch();
    });
  }
  update(element: any) {
    this.bottomSheet.open(AddOfferComponent, {
      data: { action: 'update', offer: element },
      panelClass: 'custom-width',
    }).afterDismissed().subscribe(res => {
      if (res) {
        this.fetch();
      }
    });
  }

}
