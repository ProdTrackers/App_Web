import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})

export class LocationComponent implements OnInit {

  product: Product | null = null;
  selectedSize: string | null = null;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);

    this.ProductService.getProductById(id)
      .subscribe({
        next: prod => {
          this.product = prod;
          this.selectedSize = prod.sizes[0] || null; // Set default size if available
        },
        error: err => console.error('Error fetching product:', err)
      });
  }
}
