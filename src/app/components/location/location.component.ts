import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit, AfterViewInit {

  product: Product | null = null;
  selectedSize: string | null = null;
  private map: any | null = null;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);

    this.ProductService.getProductById(id)
      .subscribe({
        next: prod => {
          this.product = prod;
        },
        error: err => console.error('Error fetching product:', err)
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.product?.iotDevice && !this.map) {
      this.initMap();
    }
  }

  initMap(): void {
    if (!this.product?.iotDevice || this.map) {
      return;
    }

    import('leaflet').then(L => {
      const { latitude, longitude } = this.product!.iotDevice;

      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map element with ID "map" not found in the DOM.');
        return;
      }

      this.map = L.map(mapElement).setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      const markerIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });

      L.marker([latitude, longitude], { icon: markerIcon })
        .addTo(this.map)
        .bindPopup(this.product!.name)
        .openPopup();

      this.map.whenReady(() => {
        setTimeout(() => this.map.invalidateSize(), 0);
      });
    }).catch(err => {
      console.error('Error loading Leaflet:', err);
    });
  }
}
