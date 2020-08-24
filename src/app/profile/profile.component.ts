import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  res: any;
  constructor(
    private product: ProductService,
    private spinner: NgxSpinnerService,
    private bottomSheet: MatBottomSheet,
    private route: Router,
    private authService: AuthService) {

  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.route.navigate(['/login']);
      return;
    }

    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });

    this.product.getStores().subscribe(res => {
      this.product.stores.next(res['content']);
    });
    this.spinner.show();

    this.product.getUser().subscribe(res => {
      this.res = res;
      this.spinner.hide();
    });
  }
  openBottomSheet(): void {
    this.bottomSheet.open(EditprofileComponent, {
      panelClass: 'custom-width',
      data: { user: this.res }
    }).afterDismissed().subscribe(res1 => {
      this.product.getUser().subscribe(res => {
        this.res = res;
        this.spinner.hide();
      });
    });
  }

}
