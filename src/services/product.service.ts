import { apiService, ApiResponse } from '../lib/api-service';
import { API_ENDPOINTS } from '../lib/api-config';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  stock: number;
  sku: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  featured: boolean;
  onSale: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  onSale?: boolean;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Product API service
 */
export const productService = {
  /**
   * Get products list with optional filters
   */
  getProducts: async (params?: ProductListParams): Promise<ApiResponse<ProductListResponse>> => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const endpoint = `${API_ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`;
    return apiService.get<ProductListResponse>(endpoint);
  },

  /**
   * Get single product by ID
   */
  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    return apiService.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  },

  /**
   * Search products
   */
  searchProducts: async (query: string, filters?: Partial<ProductListParams>): Promise<ApiResponse<ProductListResponse>> => {
    const params = new URLSearchParams({ search: query });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const endpoint = `${API_ENDPOINTS.PRODUCTS.SEARCH}?${params.toString()}`;
    return apiService.get<ProductListResponse>(endpoint);
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (categoryId: string, params?: Omit<ProductListParams, 'category'>): Promise<ApiResponse<ProductListResponse>> => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const endpoint = `${API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId)}?${queryParams.toString()}`;
    return apiService.get<ProductListResponse>(endpoint);
  },

  /**
   * Get featured products
   */
  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    return apiService.get<Product[]>(API_ENDPOINTS.PRODUCTS.FEATURED);
  },

  /**
   * Get products on sale
   */
  getSaleProducts: async (): Promise<ApiResponse<Product[]>> => {
    return apiService.get<Product[]>(API_ENDPOINTS.PRODUCTS.ON_SALE);
  },
};

export default productService;
