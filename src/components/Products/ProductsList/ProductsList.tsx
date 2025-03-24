import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from './ProductsList.module.scss';
import {useProductsStore} from "../../../store/ProductStore";
import ProductCard from "../ProductCard/ProductCard";
import {Button, Input, Spin, Pagination} from "antd";
import {HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const PAGE_SIZE = 8;

const ProductsList = () => {
    const {
        fetchProducts,
        products,
        filteredProducts,
        filterLiked,
        toggleFilter,
        loading,
        initialized
    } = useProductsStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!initialized) {
            fetchProducts();
        }
    }, [fetchProducts, initialized]);

    const filteredBySearch = useMemo(() => {
        if (!searchTerm) return filterLiked ? filteredProducts : products;

        const term = searchTerm.toLowerCase();
        return (filterLiked ? filteredProducts : products).filter(
            (product) =>
                product.title.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)
        );
    }, [products, filteredProducts, filterLiked, searchTerm]);

    const paginatedProducts = useMemo(() => {
        return filteredBySearch.slice(
            (currentPage - 1) * PAGE_SIZE,
            currentPage * PAGE_SIZE
        );
    }, [filteredBySearch, currentPage]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <Button
                    type={filterLiked ? "primary" : "text"}
                    icon={filterLiked ? <HeartFilled/> : <HeartOutlined/>}
                    className={classes.filterButton}
                    onClick={() => {
                        toggleFilter();
                        setCurrentPage(1);
                    }}
                >
                    {filterLiked ? "All Products" : "Favorites"}
                </Button>
                <Link to={'/product-create'}>
                    <Button type="primary">
                        Create
                    </Button>
                </Link>
            </div>

            <div className={classes.list}>
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map(product => (
                        <ProductCard product={product} key={product.id}/>
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
                        <Spin indicator={<LoadingOutlined spin/>} size="large"/>
                    </div>
                )}
            </div>

            {filteredBySearch.length > PAGE_SIZE && (
                <div className={classes.pagination}>
                    <Pagination
                        current={currentPage}
                        total={filteredBySearch.length}
                        pageSize={PAGE_SIZE}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsList;