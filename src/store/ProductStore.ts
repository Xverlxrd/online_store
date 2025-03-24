import { create } from 'zustand';
import { Product } from '../types/product';
import ProductService from "../services/ProductService";

interface ProductsState {
    products: Product[];
    deleteProduct: (productId: number) => void;
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;

}

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    deleteProduct: (productId) =>
        set((state) => ({
            products: state.products.filter((product) => product.id!== productId),
        })),
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const products = await ProductService.getAllProducts();
            set({ products, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch products', loading: false });
            console.error('Error fetching products:', error);
        }
    },

}));