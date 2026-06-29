import React from 'react';
import { NavLink } from "react-router-dom";

import { TbTransfer } from "react-icons/tb";
import { GrCube } from "react-icons/gr";
import { PiQrCode } from "react-icons/pi";

import '../css/header.css'
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
const Header = () => {

const {t} = useTranslation();
    return (
        <div className="head">
        <div className="header">
            <div className="header-top">
                <h1 style={{color:'white'}}>Stok Takip</h1>
            </div>
            <div className="main">
                <p className="header-des" style={{ color: "#5c5c63" }}>
                    {t("mainmenu")}
                </p>

                <NavLink to="/dashboard" className={({ isActive }) =>
                    isActive ? "header-desc active" : "header-desc"
                }>
                    <PiQrCode /> {t("dashboard")}
                </NavLink>

                <NavLink to="/products" className={({ isActive }) =>
                    isActive ? "header-desc active" : "header-desc"
                }>
                    <GrCube /> {t("products")}
                </NavLink>

                <NavLink to="/movements" className={({ isActive }) =>
                    isActive ? "header-desc active" : "header-desc"
                }>
                    <TbTransfer /> {t("movements")}
                </NavLink>

                <NavLink to="/suppliers" className={({ isActive }) =>
                    isActive ? "header-desc active" : "header-desc"
                }>

                </NavLink>
            </div>
        </div>
        </div>
    );
};

export default Header;