import type { ICheckoutRequest, ICheckoutResponse, IProduct } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async getProducts(): Promise<IProduct[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.data;
  },

  async checkout(items: ICheckoutRequest): Promise<ICheckoutResponse> {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error("Checkout failed");
    }

    const data = await response.json();
    return data.data;
  },
};
