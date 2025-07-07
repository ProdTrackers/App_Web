import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  standalone: true, // Si tu componente es standalone, esto es necesario
  imports: [CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit, AfterViewInit {

  product: Product | null = null;
  selectedSize: string | null = null;
  // No necesitas 'isBrowser' como propiedad, puedes usar isPlatformBrowser directamente
  // private isBrowser: boolean; // Puedes eliminar esta línea
  private map: any | null = null;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta PLATFORM_ID
  ) {
    // No es necesario asignarlo a una propiedad, puedes usar isPlatformBrowser directamente
    // this.isBrowser = isPlatformBrowser(this.platformId); // Puedes eliminar esta línea
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);

    this.ProductService.getProductById(id)
      .subscribe({
        next: prod => {
          this.product = prod;
          // Elimina el setTimeout de aquí. La inicialización del mapa se manejará en ngAfterViewInit.
          // if (isPlatformBrowser(this.platformId)) {
          //   setTimeout(() => this.initMap(), 100);
          // }
        },
        error: err => console.error('Error fetching product:', err)
      });
  }

  ngAfterViewInit(): void {
    // **IMPORTANTE**: Solo inicializa el mapa si estamos en el navegador
    // Y si ya tenemos los datos del producto
    if (isPlatformBrowser(this.platformId) && this.product?.iotDevice && !this.map) {
      this.initMap();
    }
  }

  initMap(): void {
    // Verifica de nuevo por si acaso, aunque ngAfterViewInit ya debería haberlo hecho
    if (!this.product?.iotDevice || this.map) {
      return; // Si no hay datos o el mapa ya está inicializado, no hagas nada
    }

    // Importa Leaflet dinámicamente. Esto asegura que el código de Leaflet
    // solo se cargue y ejecute en el cliente.
    import('leaflet').then(L => {
      const { latitude, longitude } = this.product!.iotDevice;

      // Asegúrate de que el elemento 'map' exista en tu HTML antes de llamar a L.map()
      // L.map() necesita un elemento DOM real.
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

      // Invalida el tamaño del mapa para asegurar que se renderice correctamente
      // Esto es útil si el contenedor del mapa cambia de tamaño después de la inicialización.
      this.map.whenReady(() => {
        // Un pequeño retraso puede ser útil para asegurar que el DOM esté completamente estable
        setTimeout(() => this.map.invalidateSize(), 0);
      });
    }).catch(err => {
      console.error('Error loading Leaflet:', err);
    });
  }
}
