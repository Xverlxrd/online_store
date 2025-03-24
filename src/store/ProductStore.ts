import {create} from 'zustand';
import {Product} from '../types/product';
import ProductService from "../services/ProductService";

interface ProductWithLike extends Product {
    like: boolean;
}

interface ProductsState {
    products: ProductWithLike[];
    addNewProduct: (product: Product) => void;
    filteredProducts: ProductWithLike[];
    filterLiked: boolean;
    deleteProduct: (productId: number) => void;
    toggleLike: (productId: number) => void;
    toggleFilter: () => void;
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    initialized: boolean;

}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    filteredProducts: [],
    filterLiked: false,
    loading: false,
    error: null,
    initialized: false,

    deleteProduct: (productId) => {
        const newProducts = get().products.filter(product => product.id !== productId);
        set({
            products: newProducts,
            filteredProducts: get().filterLiked ? newProducts.filter(p => p.like) : newProducts
        });
    },

    addNewProduct: (product: ProductWithLike) => {
        set((state) => {
            const newProducts = [product, ...state.products];
            return {
                products: newProducts,
                filteredProducts: state.filterLiked
                    ? newProducts.filter(p => p.like)
                    : newProducts,
            };
        });
    },

    toggleLike: (productId) => {
        const newProducts = get().products.map(product =>
            product.id === productId ? {...product, like: !product.like} : product
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
        if (get().initialized) return;

        set({loading: true, error: null});
        try {
            const products = await ProductService.getAllProducts();
            const productsWithLike = products.map(product => ({
                ...product,
                like: false,
            }));
            set({
                products: productsWithLike,
                filteredProducts: productsWithLike,
                loading: false,
                initialized: true
            });
        } catch (error) {
            set({error: 'Failed to fetch products', loading: false});
        }
    },
}));