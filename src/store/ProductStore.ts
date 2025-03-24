import { create } from 'zustand';
import { Product } from '../types/product';
import ProductService from "../services/ProductService";

interface ProductWithLike extends Product {
    like: boolean;
}

interface ProductsState {
    products: ProductWithLike[];
    filteredProducts: ProductWithLike[];
    filterLiked: boolean;
    deleteProduct: (productId: number) => void;
    toggleLike: (productId: number) => void;
    toggleFilter: () => void;
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    filteredProducts: [],
    filterLiked: false,
    loading: false,
    error: null,

    deleteProduct: (productId) => {
        const newProducts = get().products.filter(product => product.id !== productId);
        set({
            products: newProducts,
            filteredProducts: get().filterLiked ? newProducts.filter(p => p.like) : newProducts
        });
    },

    toggleLike: (productId) => {
        const newProducts = get().products.map(product =>
            product.id === productId ? { ...product, like: !product.like } : product
        );
        set({
            products: newProducts,
            filteredProducts: get().filterLiked ? newProducts.filter(p => p.like) : newProducts
        });
    },

    toggleFilter: () => {
        const shouldFilter = !get().filterLiked;
        set({
            filterLiked: shouldFilter,
            filteredProducts: shouldFilter
                ? get().products.filter(product => product.like)
                : get().products
        });
    },

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const products = await ProductService.getAllProducts();
            const productsWithLike = products.map(product => ({
                ...product,
                like: false,
            }));
            set({
                products: productsWithLike,
                filteredProducts: productsWithLike,
                loading: false
            });
        } catch (error) {
            set({ error: 'Failed to fetch products', loading: false });
            console.error('Error fetching products:', error);
        }
    },
}));