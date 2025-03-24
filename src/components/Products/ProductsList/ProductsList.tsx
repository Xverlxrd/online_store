import React, {useEffect} from 'react';
import classes from './ProductsList.module.scss';
import {useProductsStore} from "../../../store/ProductStore";
import ProductCard from "../ProductCard/ProductCard";
import {Button, Input, Spin} from "antd";
import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";

const ProductsList = () => {
    const {
        fetchProducts,
        products,
        filteredProducts,
        filterLiked,
        toggleFilter,
        loading,
    } = useProductsStore();

    useEffect(() => {
        fetchProducts()
    }, []);

    const displayedProducts = filterLiked ? filteredProducts : products;

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Input/>
                <Button
                    type={filterLiked ? "primary" : "text"}
                    icon={filterLiked ? <HeartFilled /> : <HeartOutlined />}
                    className={classes.filterButton}
                    onClick={toggleFilter}
                >
                    {filterLiked ? "All Products" : "Favorites"}
                </Button>
            </div>

            <div className={classes.list}>
                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))
                ) : (
                    <div className={classes.empty}>
                        {filterLiked
                            ? "No favorite products yet"
                            : "No products available"}
                    </div>
                )}

                {loading && (
                    <div className={classes.loading}>
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsList;