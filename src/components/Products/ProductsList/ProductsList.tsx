import React, {useEffect} from 'react';
import classes from './ProductsList.module.scss';
import {useProductsStore} from "../../../store/ProductStore";
import ProductCard from "../ProductCard/ProductCard";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const ProductsList = () => {
    const {fetchProducts, products, loading} = useProductsStore()

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div className={classes.wrapper}>
            {products && products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
            {loading && (
                <div className={classes.loading}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            )}
        </div>
    );
};

export default ProductsList;