import React, {useEffect} from 'react';
import { IoNotifications } from "react-icons/io5";
import "../css/products.css"
import { IoMdCheckmark } from "react-icons/io";

import {FaEdit} from "react-icons/fa";
import {
    Dialog,
} from "@mui/material";
import {useState} from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import { FaEyeSlash } from "react-icons/fa";

import {addProduct,getProducts ,deleteProduct,setSearch,updateProduct} from "../slices/slice/productsSlice.jsx";
import Profile from "../components/profile.jsx";
import {useTranslation} from "react-i18next";

const Products = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [selected, setSelected] = useState("");
    const [editId, setEditId] = useState(null);
    const [editPrice, setEditPrice] = useState("");


    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        dispatch(getProducts());
    },[dispatch, navigate])

    const {products,search} = useSelector((store) => store.products);

    const addProducts= async () =>{
        const payload={
            name: name,
            code: code,
            stock: Number(stock),
            category: category,
            price: Number(price),
        }
        await dispatch(addProduct(payload));
        setName("");
        setCode("");
        setStock("");
        setCategory("");
        setPrice("");

    }

    const editProduct=async  () =>{
        const editpayload={
            price : Number(editPrice),

            id:Number(editId),
        }
        await dispatch(updateProduct(editpayload));
        setEditId(null);
        setEditPrice("");

    }

    const getStatus = (stock) => {
        if (stock === 0) {
            return {
                text: t("finished"),
                className: "status red",
            };
        }

        if (stock <= 5) {
            return {
                text: t("low"),
                className: "status yellow",
            };
        }

        return {
            text: t("enough"),
            className: "status green",
        };
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name?.toLowerCase().includes(search.toLowerCase()) ||
            product.code?.toLowerCase().includes(search.toLowerCase()) ||
            product.category?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selected === "" || product.category === selected;

        return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(products.map((product)=>product.category))];

    const [page, setPage] = useState(1);
    const perPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    const paginatedProducts = filteredProducts.slice(
        (page - 1) * perPage,
        page * perPage
    );


    return (
        <div >
            <div style={{backgroundColor:'white',height:'100px',position:'relative',bottom:'25px'}}>
                <div  className='product-header'>
                    <div className='header-left'>
                        <p className='urunler'>{t("products")}</p>
                    </div>
                    <div className='header-right'>
                        <IoNotifications className='notification' />
                        <Profile></Profile>
                    </div>

                </div>
                <div>
                    <hr/>
                </div>
            </div>

            <div className='products'>
                <div className='input-container'>
                    <div>
                        <input className='dateinput' type="text" placeholder={t("searchProduct")} onChange={(e)=>(dispatch(setSearch(e.target.value))) } />

                        <select
                            className='productinput'
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            <option value="">{t("allCategories")}</option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}

                                </option>
                            ))}
                        </select>

                    </div>
                    <>
                        <p className="add-product" onClick={() => setOpen(true)}>
                            {t("newProduct")}
                        </p>

                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            sx={{
                                "& .MuiDialog-paper": {
                                    width: "400px",
                                    height: "600px",
                                    maxWidth: "none",
                                    borderRadius: "16px",
                                },
                            }}
                        >

                            <div style={{ padding: "20px" }}>
                                <h2>{t("addProduct")}</h2>
                                <div className='addcontainer'>
                                    <input onChange={(e)=>{setName(e.target.value)}} className='addname' placeholder={t("productname")} required />
                                    <input onChange={(e)=>{setCode(e.target.value)}} className='addcode' placeholder={t("productcode")} required />
                                    <input onChange={(e)=>{setStock(e.target.value)}} className='addstock' type="number" min="1" placeholder={t("stockQuantity")} required/>
                                    <input onChange={(e)=>{setCategory(e.target.value)}} className='addcategory' placeholder={t("productcategory")} required/>
                                    <input onChange={(e)=>{setPrice(e.target.value)}} className='addprice' type="number" min="1" placeholder={t("productprice")} required/>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button onClick={addProducts} className='addbutton'>{t("save")}</button>
                                <button className='closebtn' onClick={() => setOpen(false)}>{t("close")}</button>
                            </div>

                        </Dialog>
                    </>

                </div>
                <table className="product-table">
                    <thead>
                    <tr>
                        <th>{t("productname")}</th>
                        <th>{t("productcode")}</th>
                        <th>{t("productcategory")}</th>
                        <th>{t("productstock")}</th>
                        <th>{t("productprice")}</th>
                        <th>{t("productstatus")}</th>
                        <th>{t("productsprocess")}</th>
                    </tr>
                    </thead>

                    <tbody>
                    {paginatedProducts.map((product) => {


                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.code}</td>
                                <td>{product.category}</td>
                                <td>{
                                   product.stock
                                }</td>
                                <td>{
                                    editId === product.id ? <input value={editPrice} onChange={(e)=>{setEditPrice(e.target.value)}} type="text" style={{width:'60px',height:'30px'}}/> : product.price
                                }</td>
                                <td>
                                    <span className={getStatus(product.stock).className}>
                                        {getStatus(product.stock).text}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-icons">

                                        {
                                            editId === product.id ? <IoMdCheckmark onClick={editProduct}/>   : <FaEdit onClick={()=>{setEditId(product.id); setEditPrice(product.price)}}  />

                                        }

                                        <FiTrash2 className="delete-icon" onClick={()=>{dispatch(deleteProduct(product.id))}} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPage(index + 1)}
                        className={page === index + 1 ? "active-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;