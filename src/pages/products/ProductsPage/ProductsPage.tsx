import React from 'react';
import classes from './ProductsPage.module.scss';
import ProductsList from "../../../components/Products/ProductsList/ProductsList";
const ProductsPage = () => {

    return (
        <div className={classes.wrapper}>
            <ProductsList/>
        </div>
    );
};

export default ProductsPage;