export interface ProductResponse {
  data: {
    data: Product[];
    meta?: PaginationMeta;
  };
}

export interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
  price_before_discount: number | null;
  category_name: string;
  is_active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductQueryParams {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
}
