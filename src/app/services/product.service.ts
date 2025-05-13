import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Store } from '../models/store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/stores`);
  }

  getProductsByStore(storeId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?storeId=${storeId}`);
  }
}
