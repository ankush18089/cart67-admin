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
  public stores = new BehaviorSubject<any[]>([]);
  public products = new BehaviorSubject<any[]>([]);
  public storeId = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { }

  getProducts(page: string, size: string, query: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('q', query)
    });
  }

  removeFromStore( id: number) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product/remove', {
      params: new HttpParams()
        .set('id', id.toString())
    });
  }

  addProductToSore(data: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`https://dapi.shunyafoundation.com/cart67-product/api/product-store`, data, httpOptions);
  }

  getMasterProducts(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/master-product', {
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

  getOffers(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-notification/api/offer', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }
  getOffer(id: number) {
    return this.http.get(`https://dapi.shunyafoundation.com/cart67-notification/api/offer/${id}`);
  }
  createOffer(payload: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('https://dapi.shunyafoundation.com/cart67-notification/api/offer', payload, httpOptions);
  }
  deleteOffer(id: number) {
    return this.http.delete(`https://dapi.shunyafoundation.com/cart67-notification/api/offer/${id}`);
  }
  updateOffer(id: number, data: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`https://dapi.shunyafoundation.com/cart67-notification/api/offer/${id}`, data, httpOptions);
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
