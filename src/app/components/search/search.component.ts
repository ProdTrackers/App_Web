import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { Store } from '../../models/store';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  products: Product[]=[];
  stores: Store[] = [];
  selectedStoreId: number | null = null;
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getStores().subscribe(stores => this.stores = stores);
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  onStoreChange() {
    if (this.selectedStoreId !== null) {
      this.productService.getProductsByStore(this.selectedStoreId).subscribe(products => this.products = products);
    } else {
      this.productService.getProducts().subscribe(products => this.products = products);
    }
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


}
