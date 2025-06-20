import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// 1) Import estático de Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 2) Parchea los iconos por defecto para producción
const iconDefault = L.Icon.Default.prototype as any;

iconDefault.options.iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
iconDefault.options.iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
iconDefault.options.shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

@Component({
  selector: 'app-location',
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit, AfterViewInit {
  product: Product | null = null;
  isBrowser: boolean;
  private map: L.Map | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);
    this.productService.getProductById(id).subscribe({
      next: prod => {
        this.product = prod;
        if (this.isBrowser) {
          // asegúrate de que el div #map ya esté en el DOM
          setTimeout(() => this.initMap(), 100);
        }
      },
      error: err => console.error('Error fetching product:', err)
    });
  }

 initMap(): void {
    if (!this.product?.iotDevice || this.map) return;

    const { latitude, longitude } = this.product.iotDevice;

    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Aquí creas el icono
    const markerIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    // Y aquí lo usas
    L.marker([latitude, longitude], { icon: markerIcon })
      .addTo(this.map)
      .bindPopup(this.product.name)
      .openPopup();

    this.map.whenReady(() => {
      setTimeout(() => this.map.invalidateSize(), 200);
    });
  }
  
  ngAfterViewInit(): void {
    // En caso de que `product` ya estuviera cargado antes del render
    if (this.isBrowser && this.product?.iotDevice) {
      this.initMap();
    }
  }
}
