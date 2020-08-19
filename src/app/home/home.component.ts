import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditproductComponent } from '../editproduct/editproduct.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'picture', 'action'];
  result: any;
  constructor(
    private bottomSheet: MatBottomSheet,
    private auth: AuthService,
    private product: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.product.getProducts('0', '10').subscribe(res => {
      this.result = res['content'];
      this.paginator.length = res['totalElements']
    });
  }
  fetch() {
    this.product.getProducts(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(res => {
      this.result = res['content'];
      this.paginator.length = res['totalElements']
    });
  }

  edit(varient: any, name: string): void {
    this.bottomSheet.open(EditproductComponent, {
      data: { varient: varient, name: name },
      panelClass: 'custom-width',
    }).afterDismissed().subscribe(res => {
      this.fetch();
    });
  }

  logout() {
    this.auth.doLogoutUser();
    this.router.navigate(['/login']);
  }

}
