import React, {useState} from 'react';
import classes from './ProductCard.module.scss'
import {Product} from "../../../types/product";
import {HeartFilled, RestOutlined} from "@ant-design/icons";
import {useProductsStore} from "../../../store/ProductStore";

interface ProductCard {
    product: Product,
}

const ProductCard = ({product}:ProductCard) => {
    const {deleteProduct} = useProductsStore()
    const [like, setLike] = useState(false);


    return (
        <div className={classes.card}>
            <img
                className={classes.card_image}
                src={product?.image}
                alt={'PRODUCT_IMAGE'}
            />
            <h2 className={classes.card_title}>{product?.title}</h2>
            <p className={classes.card_description}>{product?.description}</p>
            <h3 className={classes.card_price}>{product?.price}</h3>
            <div className={classes.card_btns}>
                <HeartFilled
                    onClick={() => setLike(!like)}
                    className={like ? classes.card_btns__like : classes.card_btns__notlike}
                />
                <RestOutlined
                    onClick={() => deleteProduct(product?.id)}
                    className={classes.card_btns__delete}
                />
            </div>
        </div>
    );
};

export default ProductCard;