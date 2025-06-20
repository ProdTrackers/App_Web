import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

export class LocationComponent implements OnInit, AfterViewInit {

  product: Product | null = null;
  selectedSize: string | null = null;
  isBrowser: boolean;
  private map: any | null = null;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);

    this.ProductService.getProductById(id)
      .subscribe({
        next: prod => {
          this.product = prod;

          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.initMap(), 100);
          }
        },
        error: err => console.error('Error fetching product:', err)
      });
  }

  initMap(): void {
    if (!this.product?.iotDevice || this.map) return; // ya inicializado

    import('leaflet').then(L => {
      const { latitude, longitude } = this.product!.iotDevice;

      // 1) DEFINES AQUÍ tu icono personalizado
      const myIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize:     [25, 41],
        iconAnchor:   [12, 41],
        popupAnchor:  [0, -41]
      });

      // 2) INICIALIZAS EL MAPA
      this.map = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // 3) AÑADES EL MARCADOR usando tu icono
      L.marker([latitude, longitude], { icon: myIcon })
        .addTo(this.map)
        .bindPopup(this.product!.name)
        .openPopup();

      // 4) FORZAS el redimensionado si hiciera falta
      this.map.whenReady(() => {
        setTimeout(() => this.map.invalidateSize(), 200);
      });
    });
  }

  ngAfterViewInit(): void {
    // Si el producto ya está cargado cuando se termina de renderizar
    if (this.product?.iotDevice) {
      this.initMap();
    }
  }
}
