import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-message',
  templateUrl: './store-message.component.html',
  styleUrls: ['./store-message.component.css']
})
export class StoreMessageComponent implements OnInit {

  constructor( private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.getUser().subscribe(user => {
      this.product.isLoggedIn.next(true);
      this.product.user.next(user['name']);
    });
  }

}
