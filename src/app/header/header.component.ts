import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = "Cart 67 Admin";
  stores: any;
  selectedStore = 'none';
  user: any;
  isLoggedIn: boolean = false;
  constructor(
    private product: ProductService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product.getStores().subscribe(res => {
      this.stores = res['content'];
      if (localStorage.getItem('store')) {
        this.selectedStore = localStorage.getItem('store');
      }
    });
    this.product.user.subscribe(res => {
      this.user = res;
    });

    this.product.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })
  }
  storeChange() {
    localStorage.setItem('store', this.selectedStore);
    this.checkForStore();
  }

  checkForStore() {
    if (localStorage.getItem('store') === 'none') {
      this.router.navigate(['/nostore']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  logout() {
    this.auth.doLogoutUser();
    this.product.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
