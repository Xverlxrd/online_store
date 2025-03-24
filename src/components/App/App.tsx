import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import ProductsPage from "../../pages/products/ProductsPage/ProductsPage";
import ProductPage from "../../pages/products/ProductPage/ProductPage";
import ProductCreate from "../../pages/products/ProductCreate/ProductCreate";

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<ProductsPage/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/product-create' element={<ProductCreate/>}/>
        </Routes>
    );
};

export default App;