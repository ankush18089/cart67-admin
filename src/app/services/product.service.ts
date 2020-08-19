import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: string, size: string) {
    return this.http.get('https://dapi.shunyafoundation.com/cart67-product/api/product', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    });
  }
}
