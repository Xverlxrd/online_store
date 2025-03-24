import classes from './ProductsPage.module.scss';
import ProductsList from "../../components/Products/ProductsList/ProductsList";
const ProductsPage = () => {

    return (
        <div className={classes.wrapper}>
            <h1>Products Page</h1>
            <ProductsList/>
        </div>
    );
};

export default ProductsPage;