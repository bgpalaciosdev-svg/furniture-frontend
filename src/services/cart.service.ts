import { apiService, ApiResponse } from '../lib/api-service';
import { API_ENDPOINTS } from '../lib/api-config';

export interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    images: string[];
    stock: number;
  };
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

/**
 * Cart API service
 */
export const cartService = {
  /**
   * Get user's cart
   */
  getCart: async (token: string): Promise<ApiResponse<Cart>> => {
    return apiService.get<Cart>(API_ENDPOINTS.CART.GET, token);
  },

  /**
   * Add item to cart
   */
  addToCart: async (data: AddToCartRequest, token: string): Promise<ApiResponse<CartItem>> => {
    return apiService.post<CartItem>(API_ENDPOINTS.CART.ADD, data, token);
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (data: UpdateCartItemRequest, token: string): Promise<ApiResponse<CartItem>> => {
    return apiService.put<CartItem>(API_ENDPOINTS.CART.UPDATE, data, token);
  },

  /**
   * Remove item from cart
   */
  removeFromCart: async (itemId: string, token: string): Promise<ApiResponse<unknown>> => {
    return apiService.delete(API_ENDPOINTS.CART.REMOVE, token);
  },

  /**
   * Clear entire cart
   */
  clearCart: async (token: string): Promise<ApiResponse<unknown>> => {
    return apiService.delete(API_ENDPOINTS.CART.CLEAR, token);
  },

  /**
   * Get cart items count
   */
  getCartCount: async (token: string): Promise<ApiResponse<{ count: number }>> => {
    return apiService.get<{ count: number }>(API_ENDPOINTS.CART.COUNT, token);
  },
};

export default cartService;
