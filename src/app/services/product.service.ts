import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public user = new BehaviorSubject<string>('');
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  getProducts(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }

  getVarient(varientId: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product-variant/' + varientId);
  }

  getStores() {
    return this.http.get('https://dapi.carvia.tech/cart67-product/api/store');
  }

  updateProduct(varientId: string, payload: string) {
    return this.http.put('https://dapi.shunyafoundation.com/cart67-product/api/product-variant/' + varientId, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getUser() {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-auth/api/account/me');
  }
  updateProfile(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('https://dapi.shunyafoundation.com/cart67-auth/api/account/profile', data, httpOptions);
  }
}
