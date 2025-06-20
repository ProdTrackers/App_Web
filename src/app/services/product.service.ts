import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Store } from '../models/store';
import { Observable } from 'rxjs';
import { environment } from '../shared/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  //private readonly baseUrl = 'http://localhost:3000';
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/inventory`);
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/stores/all`);
  }

  getProductsByStore(storeId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?storeId=${storeId}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/inventory/${id}`);
  }
}
