import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import classes from './ProductPage.module.scss';
import {useProductsStore} from "../../../store/ProductStore";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button, Rate} from "antd";

const ProductPage = () => {
    const {products} = useProductsStore();
    const {id} = useParams();
    const navigate = useNavigate();

    const product = products.find(product => product.id === Number(id));

    if (!product) {
        return <div className={classes.notFound}>Product not found</div>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.card}>
                <div className={classes.header}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate(-1)}
                        className={classes.backButton}
                    >
                        Back to products
                    </Button>

                </div>

                <div className={classes.content}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.card_image}
                            src={product.image}
                            alt={product.title}
                        />
                    </div>

                    <div className={classes.details}>
                        <h1 className={classes.title}>{product.title}</h1>

                        <div className={classes.priceSection}>
                            <span className={classes.price}>${product.price.toFixed(2)}</span>
                            {product.rating && (
                                <Rate
                                    disabled
                                    defaultValue={product.rating.rate}
                                    allowHalf
                                    className={classes.rating}
                                />
                            )}
                        </div>

                        <p className={classes.description}>{product.description}</p>

                        <div className={classes.actions}>
                            <Button type="primary" size="large" className={classes.buyButton}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;