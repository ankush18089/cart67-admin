import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCourse(page: string, size: string, query: string) {
    return this.http.get('http://localhost:8080/api/courses', {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('query', query)
    });
  }

  getCategories() {
    return this.http.get('http://localhost:8080/api/categories');
  }
  getMyEnrollment(token:string) {
    return this.http.get('http://localhost:8080/api/enrollment', {
      params: new HttpParams()
        .set('token', token)
    });
  }
}
