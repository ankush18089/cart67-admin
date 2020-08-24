import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddOfferComponent } from '../add-offer/add-offer.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: any;
  displayedColumns: string[] = ['name', 'picture', 'type', 'subText', 'action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private bottomSheet: MatBottomSheet,
    private product: ProductService) { }

  ngOnInit(): void {
    this.fetch();
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    });
  }

  fetch() {
    this.product.getOffers('0', '3').subscribe(res => {
      this.offers = res['content'];
      this.paginator.length = res['totalElements'];
    })
  }

  add() {
    this.bottomSheet.open(AddOfferComponent, {
      data: { action: 'add', offer: null },
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
