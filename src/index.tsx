import {createRoot} from "react-dom/client";
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./components/App/App";
import './style.scss';

const root = document.getElementById('root')
const container = createRoot(root)


container.render(
    <HashRouter>
        <App />
    </HashRouter>
)