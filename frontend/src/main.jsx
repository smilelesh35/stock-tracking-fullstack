import "@fontsource/inter";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './slices/store.jsx'
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import "./change-language/i18n.jsx"

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>

)
