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
  public productsLength = new BehaviorSubject<number>(0);
  public storeId = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProducts(page: string, size: string, query: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('q', query)
    });
  }

  searchMasterProducts(page: string, size: string, query: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/master-product/search', {
      params: new HttpParams()
        .set('query', query)
    });
  }

  getVarient(varientId: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product-variant/' + varientId);
  }

  removeFromStore(id: number) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product/remove', {
      params: new HttpParams()
        .set('id', id.toString())
    });
  }

  getCollections(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/collection', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }

  getTags() {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/tag');
  }

  getCollectionsList() {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/app/collection-list');
  }

  createCollection(data: string) {
    return this.http.post(`https://dapi.shunyafoundation.com/cart67-product/api/collection`, data, this.httpOptions);
  }

  updateCollections(collectionId: number, data: string) {
    return this.http.put(`https://dapi.shunyafoundation.com/cart67-product/api/collection/${collectionId}`, data, this.httpOptions);
  }

  deleteCollection(collectionId: number) {
    return this.http.delete(`https://dapi.shunyafoundation.com/cart67-product/api/collection/${collectionId}`);
  }

  addProductToSore(data: string) {
    return this.http.post(`https://dapi.shunyafoundation.com/cart67-product/api/product-store`, data, this.httpOptions);
  }

  getMasterProducts(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/master-product', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }

  getDashboardItems() {
    return this.http.get('https://dapi.carvia.tech/cart67-product/api/dashboard-item-new');
  }

  deleteDashboardItem(id: string) {
    return this.http.delete(`https://dapi.carvia.tech/cart67-product/api/dashboard-item-new/${id}`);
  }

  updateDashboardItem(id: string, payload: string) {
    return this.http.put(`https://dapi.carvia.tech/cart67-product/api/dashboard-item-new/${id}`, payload, this.httpOptions);
  }

  createDashboardItem(payload: string) {
    return this.http.post('https://dapi.carvia.tech/cart67-product/api/dashboard-item-new', payload, this.httpOptions);
  }

  updateProduct(varientId: string, payload: string) {
    return this.http.put('https://dapi.shunyafoundation.com/cart67-product/api/product-variant/' + varientId, payload, this.httpOptions);
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
    return this.http.post('https://dapi.shunyafoundation.com/cart67-notification/api/offer', payload, this.httpOptions);
  }

  deleteOffer(id: number) {
    return this.http.delete(`https://dapi.shunyafoundation.com/cart67-notification/api/offer/${id}`);
  }

  updateOffer(id: number, data: string) {
    return this.http.put(`https://dapi.shunyafoundation.com/cart67-notification/api/offer/${id}`, data, this.httpOptions);
  }

  updateProfile(data: string) {
    return this.http.post('https://dapi.shunyafoundation.com/cart67-auth/api/account/profile', data, this.httpOptions);
  }

  getUser() {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-auth/api/account/me');
  }

  getStores() {
    return this.http.get('https://dapi.carvia.tech/cart67-product/api/store');
  }
}
