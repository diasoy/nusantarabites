import {
  ProductDetailResponse,
  ProductQueryParams,
  ProductResponse,
} from "@/types/product";
import { api } from "./api";

class ProductService {
  async getProducts(params?: ProductQueryParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", String(params?.page || 1));
    queryParams.append("size", String(params?.size || 10));

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    if (params?.category) {
      queryParams.append("category", String(params.category));
    }

    const response = await api.get<ProductResponse>(
      `/products?${queryParams.toString()}`,
    );
    return response.data;
  }

  async getProductDetail(id: string) {
    const response = await api.get<ProductDetailResponse>(`/products/${id}`);
    return response.data;
  }
}

export const productService = new ProductService();
export default productService;
