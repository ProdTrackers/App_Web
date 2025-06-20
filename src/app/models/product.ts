export interface IotDevice {
  id: number;
  deviceIdentifier: string | null;
  latitude: number;
  longitude: number;
  inventoryId: number | null;
}

export interface Product {
  id: number;
  storeId: number;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
  stock: number;
  rating: number;
  reviews: number;
  discount?: number;
  color: string;
  iotDevice: IotDevice; // <-- Asegúrate de incluirlo
}
