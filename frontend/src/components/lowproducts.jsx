import React, {useState} from 'react';
import {IoCubeOutline} from "react-icons/io5";
import '../css/lowproducts.css'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
const Lowproducts = () => {
    const [page, setPage] = useState(1);
    const perPage = 5;
const {t}= useTranslation();
    const products = useSelector((store) => store.products.products);

    const lowStockProducts = products.filter(
        (product) => Number(product.stock) <= 5
    );

    const totalPages = Math.ceil(lowStockProducts.length / perPage);

    const paginatedProducts = lowStockProducts.slice(
        (page - 1) * perPage,
        page * perPage
    );
    return (
        <div>
            <div className="dashboard-row">
                <div className="low-stock-box">
                    <h3>{t("lowstock")}</h3>

                    {paginatedProducts.map((product) => (
                        <div className="low-stock-row" key={product.id}>
                            <div className="product-info">
                                <div className="product-icon">
                                    <IoCubeOutline />
                                </div>

                                <div>
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-code">{product.code}</p>
                                </div>
                            </div>

                            <p className="stock-text">Stok: {product.stock}</p>

                            <span
                                className={
                                    Number(product.stock) <= 5
                                        ? "stock-badge critical"
                                        : "stock-badge low"
                                }
                            >
                {Number(product.stock) <= 5 ? "Kritik" : "Düşük"}
              </span>
                        </div>
                    ))}

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
            </div>
        </div>
    );
};

export default Lowproducts;