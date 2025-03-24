import axios from "axios";
import {Product} from "../types/product";

class ProductService {

    async getAllProducts(): Promise<Product[]> {
        try {
            const response = await axios.get('https://fakestoreapi.com/products')
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductService;