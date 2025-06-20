import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// 1) Import estático de Leaflet
import * as L from 'leaflet';

// 2) Parchea los iconos por defecto para producción
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
  iconUrl:       'assets/leaflet/images/marker-icon.png',
  shadowUrl:     'assets/leaflet/images/marker-shadow.png'
});

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
    if (!this.product?.iotDevice || this.map) return;  // ya inicializado

    const { latitude, longitude } = this.product.iotDevice;

    // 3) Inicializa el mapa
    this.map = L.map('map').setView([latitude, longitude], 13);

    // 4) Capa de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // 5) Marcador (usa el icono por defecto parcheado)
    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(this.product.name)
      .openPopup();

    // 6) Forzar recalculo de tamaño si fuera necesario
    this.map.whenReady(() => {
      setTimeout(() => this.map!.invalidateSize(), 200);
    });
  }

  ngAfterViewInit(): void {
    // En caso de que `product` ya estuviera cargado antes del render
    if (this.isBrowser && this.product?.iotDevice) {
      this.initMap();
    }
  }
}
