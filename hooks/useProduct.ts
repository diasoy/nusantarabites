import { productService } from "@/services/product.service";
import { ProductQueryParams } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}
