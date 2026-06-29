import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/slice/productsSlice.jsx";
import { IoNotifications, IoCubeOutline } from "react-icons/io5";
import Profile from "../components/profile.jsx";
import "../css/dashboard.css";
import { LuTriangleAlert } from "react-icons/lu";
import { PiMoneyLight } from "react-icons/pi";
import Lowproducts from "../components/lowproducts.jsx"
import { useTranslation } from "react-i18next";
import Movechart from "../components/movechart.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const products = useSelector((store) => store.products.products);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        dispatch(getProducts());
    }, [dispatch, navigate]);

    const productnumber = products.length;

    const lowproducts = products.filter(
        (product) => Number(product.stock) <= 5
    ).length;

    const totalValue = products.reduce((total, product) => {
        return total + Number(product.stock) * Number(product.price);
    }, 0);

    return (
        <div>
            <div
                style={{
                    backgroundColor: "white",
                    height: "100px",
                    position: "relative",
                    bottom: "25px",
                }}
            >
                <div className="product-header">
                    <div className="header-left">
                        <p className="urunler">{t("dashboard")}</p>
                    </div>

                    <div className="header-right">
                        <IoNotifications className="notification" />
                        <Profile />
                    </div>
                </div>

                <div>
                    <hr />
                </div>

                <div className="allcontainer">
                    <div className="container">
                        <div className="left">
                            <div className="cubecont">
                                <IoCubeOutline className="cube" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("totalProduct")}</p>
                            <p className="p1">{productnumber}</p>
                            <p className="allproduct">{t("allProducts")}</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="left">
                            <div className="alertcont">
                                <LuTriangleAlert className="alert" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("lowStock")}</p>
                            <p className="p2">{lowproducts}</p>
                            <p className="stock">{t("lowStockLevel")}</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="left">
                            <div className="moneycont">
                                <PiMoneyLight className="money" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("totalValue")}</p>
                            <p className="p3">{totalValue} TL</p>
                            <p className="price">{t("totalStockPrice")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Lowproducts />
            </div>
            <div>
                <Movechart />
            </div>
        </div>
    );
};

export default Dashboard;