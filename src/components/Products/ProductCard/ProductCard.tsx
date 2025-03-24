import React from 'react';
import classes from './ProductCard.module.scss'
import {DeleteOutlined, HeartFilled} from "@ant-design/icons";
import {useProductsStore} from "../../../store/ProductStore";
import {Link} from "react-router-dom";

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

const ProductCard = ({product}: ProductCardProps) => {
    const {deleteProduct, toggleLike} = useProductsStore()
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLike(product.id);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteProduct(product.id);
    };

    return (
        <Link to={`/product/${product.id}`} className={classes.card_link}>
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
                        onClick={handleLikeClick}
                        className={product.like ? classes.card_btns__like : classes.card_btns__notlike}
                    />
                    <DeleteOutlined
                        onClick={handleDeleteClick}
                        className={classes.card_btns__delete}
                    />
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;