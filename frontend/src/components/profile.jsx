import React from 'react';
import "../css/products.css"
import { Menu, MenuItem } from "@mui/material";
import {useState} from "react";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signout = ()=>{
        localStorage.removeItem("token");
    }
    const { t, i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };
    return (

        <div>

            <p className="avatar" onClick={handleOpen}>

            </p>

            <select onChange={(e) => changeLang(e.target.value)}>
                <option value="tr">TR</option>
                <option value="en">EN</option>
            </select>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={signout}>Sign out</MenuItem>
            </Menu>
        </div>
    );
};

export default Profile;