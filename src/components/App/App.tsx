import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProductsPage from "../../pages/ProductsPage/ProductsPage";

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<ProductsPage/>}/>
            <Route path='/product/id' />
            <Route path='/product-create' />
        </Routes>
    );
};

export default App;