import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService} from '../../services/product.service';
import { Product} from '../../models/product';
import { Store } from '../../models/store';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);

  constructor(private router: Router) {}

  stores = signal<Store[]>([]);
  allProducts = signal<Product[]>([]);
  products = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);
  selectedStoreId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadStores();
    this.loadAllProducts();
  }

  loadStores() {
    this.productService.getStores().subscribe(stores => {
      this.stores.set(stores);
    });
  }

  loadAllProducts() {
    this.productService.getProducts().subscribe(products => {
      this.allProducts.set(products);
      this.products.set(products);
    });
  }

  selectStore(storeId: number) {
    this.selectedStoreId.set(storeId);
    const filtered = this.allProducts().filter(p => p.storeId === storeId);
    this.products.set(filtered);
    this.selectedProduct.set(null);
  }

  resetStoreFilter() {
    this.selectedStoreId.set(null);
    this.products.set(this.allProducts());
    this.selectedProduct.set(null);
  }

  selectProduct(product: Product) {
    this.selectedProduct.set(product);
  }

  discount(p: Product): number {
    return p.discount ?? 0;
  }

  goToLocation(id: number) {
    this.router.navigate(['/location', id]);
  }
}
