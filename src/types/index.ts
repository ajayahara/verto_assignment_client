export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ICartItem {
  id: number;
  quantity: number;
  product?: IProduct;
}

export interface ICheckoutRequest {
  items: ICartItem[];
}

export interface ICheckoutResponse {
  success: boolean;
  message: string;
  orderId?: string;
  total: number;
}