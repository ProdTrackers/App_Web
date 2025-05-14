export interface Product {
  id: number;
  storeId: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  discount?: number;
}
