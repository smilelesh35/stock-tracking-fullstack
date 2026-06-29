import React from "react";
import Header from "./components/header.jsx";
import RouterConfig from "./router/routerConfig.jsx";
import { useLocation } from "react-router-dom";
import "./App.css";

const App = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    const isAuthPage = isLoginPage || isRegisterPage;

    return (
        <div className={isAuthPage ? "login-layout" : "layout"}>
            {!isAuthPage && <Header />}

            <main className={isAuthPage ? "login-content" : "page-content"}>
                <RouterConfig />
            </main>
        </div>
    );
};

export default App;