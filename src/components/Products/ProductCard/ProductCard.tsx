import React from 'react';
import classes from './ProductCard.module.scss'
import {DeleteOutlined, HeartFilled} from "@ant-design/icons";
import {useProductsStore} from "../../../store/ProductStore";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
        like: boolean;
    };
}
const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

const ProductCard = ({product}:ProductCardProps) => {
    const {deleteProduct, toggleLike} = useProductsStore()
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className={classes.card}>
            <img
                className={classes.card_image}
                src={product.image}
                alt={product.title}
            />

            <div className={classes.card_content}>
                <h2 className={classes.card_title}>
                    {truncateText(product.title, MAX_TITLE_LENGTH)}
                </h2>
                <p className={classes.card_description}>
                    {truncateText(product.description, MAX_DESCRIPTION_LENGTH)}
                </p>
                <h3 className={classes.card_price}>${product.price.toFixed(2)}</h3>
            </div>

            <div className={classes.card_btns}>
                <HeartFilled
                    onClick={() => toggleLike(product.id)}
                    className={product.like ? classes.card_btns__like : classes.card_btns__notlike}
                />
                <DeleteOutlined
                    onClick={() => deleteProduct(product.id)}
                    className={classes.card_btns__delete}
                />
            </div>
        </div>
    );
};

export default ProductCard;