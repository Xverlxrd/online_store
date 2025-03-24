import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import App from "./components/App/App";
import './style.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HashRouter basename="/AlphaEcosystemTestWork">
            <App />
        </HashRouter>
    </React.StrictMode>
);