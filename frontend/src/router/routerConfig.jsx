import React from 'react';

import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard.jsx";
import Movements from "../pages/movements.jsx";
import Products from "../pages/products.jsx";
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";

const RouterConfig = () => {
    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/movements" element={<Movements />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default RouterConfig;