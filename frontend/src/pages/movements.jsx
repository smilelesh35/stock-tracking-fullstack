import React, {useEffect,useState} from 'react';
import {useNavigate} from "react-router";
import Profile from "../components/profile.jsx";
import '../css/movements.css'
import {IoNotifications} from "react-icons/io5";
import {useTranslation} from "react-i18next";
import {LuTriangleAlert} from "react-icons/lu";
import { IoClipboardOutline } from "react-icons/io5";
import {PiMoneyLight} from "react-icons/pi";
import {Dialog} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addMovement, getMovement} from "../slices/slice/movementSlice.jsx";
const Movements = () => {
    const {t}= useTranslation();
    const [open ,setOpen] = useState(false);

    const [addcode ,setAddcode] = useState("");
    const [addsituation ,setAddsituation] = useState("");
    const [description ,setDescription] = useState("");
    const [count , setCount] = useState("");

    const [situation, setSituation] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    },[navigate])
    const dispatch = useDispatch();
    const addMovements = async ()=>{
        const payload ={
            code: addcode,
            type: addsituation,
            count: count,
            description: description,

        }
        await dispatch(addMovement(payload)).unwrap();
        setAddcode("");
        setAddsituation("");
        setDescription("");
        setCount("");
        setOpen(false);

    }
    const moveitems = useSelector((store) =>store.movements.movements);


    useEffect(()=>{
        dispatch(getMovement())
    },[dispatch])

    const filteredMovements = moveitems.filter((item) =>{

        const matchestext =
            item.name?.toLowerCase().includes(text.toLowerCase())||
            item.code?.toLowerCase().includes(text.toLowerCase())||
            item.description?.toLowerCase().includes(text.toLowerCase());


        const matchessituation =
            situation === "" || item.type === situation

        const matchesdate = date ===""|| item.created_at?.startsWith(date);
        return matchestext && matchessituation && matchesdate;
    })

    const [page, setPage] = useState(1);
    const perPage = 7;
    const totalPages = Math.ceil(filteredMovements.length / perPage);

    const paginatedProducts = filteredMovements.slice(
        (page - 1) * perPage,
        page * perPage
    );
    const inmovecount = moveitems.filter((item) => item.type === "in").length;
    const outmovecount = moveitems.filter((item) => item.type === "out").length;
    const movecount = moveitems.length
   return (
        <div>
            <div style={{ backgroundColor: 'white', height: '100px', position: 'relative', bottom: '25px' }}>
                <div className='product-header'>
                    <div className='header-left'>
                        <p className='urunler'>{t("movements")}</p>
                    </div>

                    <div className='header-right'>
                        <IoNotifications className='notification' />
                        <Profile />
                    </div>
                </div>
            </div>


                <div>
                    <hr />
                </div>

                <div className="allcontainer">
                    <div className="container">
                        <div className="left">
                            <div className="cubecont">
                                <IoClipboardOutline className="cube" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("totalmove")}</p>
                            <p className="p1">{movecount}</p>
                            <p className="allproduct">{t("alltime")}</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="left">
                            <div className="alertcont">
                                <LuTriangleAlert className="alert" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("enterence")}</p>
                            <p className="p2">{inmovecount}</p>
                            <p className="stock">{t("alltime")}</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="left">
                            <div className="moneycont">
                                <PiMoneyLight className="money" />
                            </div>
                        </div>

                        <div className="right">
                            <p>{t("productrelease")}</p>
                            <p className="p3">{outmovecount}</p>
                            <p className="price">{t("alltime")}</p>
                        </div>
                    </div>
                </div>
            <div>
                <div className="input-container">
                    <input
                        className="search"
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder={t("searchMovementPlaceholder")}
                    />

                    <select
                        onChange={(e) => setSituation(e.target.value)}
                        className="searchmovements"
                    >
                        <option value="">{t("allMovements")}</option>
                        <option value="in">{t("in")}</option>
                        <option value="out">{t("out")}</option>
                    </select>

                    <input value={date} onChange={(e)=>{setDate(e.target.value)}} className="date" type="date" />

                    <p className="button" onClick={() => setOpen(true)}>
                        + {t("addMovement")}
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
                            <h2>{t("addMovement")}</h2>

                            <div className="addcontainer">
                                <input
                                    value={addcode}
                                    placeholder={t("productCode")}
                                    type="text"
                                    required
                                    className="addcode"
                                    onChange={(e) => setAddcode(e.target.value)}
                                />

                                <select
                                    value={addsituation}
                                    onChange={(e) => setAddsituation(e.target.value)}
                                    className="addsituation"
                                >
                                    <option value="">{t("selectProcess")}</option>
                                    <option value="in">{t("in")}</option>
                                    <option value="out">{t("out")}</option>
                                </select>

                                <input
                                    value={description}
                                    placeholder={t("description")}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    required
                                    className="adddescription"
                                />

                                <input
                                    value={count}
                                    type="number"
                                    placeholder={t("quantity")}
                                    className="addcount"
                                    onChange={(e) => setCount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="buttons">
                            <button onClick={addMovements} className="addbutton">
                                {t("save")}
                            </button>

                            <button className="closebtn" onClick={() => setOpen(false)}>
                                {t("close")}
                            </button>
                        </div>
                    </Dialog>
                </div>
            </div>

            <div>
                <table className="movements-table">
                    <thead>
                    <tr>
                        <th>{t("product")}</th>
                        <th>{t("code")}</th>
                        <th>{t("process")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("category")}</th>
                        <th>{t("date")}</th>
                        <th>{t("description")}</th>
                    </tr>
                    </thead>

                    <tbody>
                    {paginatedProducts.map((move) => {
                        return (
                            <tr key={move.id}>
                                <td>{move.name}</td>
                                <td>{move.code}</td>
                                <td>{move.type === "in" ? t("in") : t("out")}</td>
                                <td>{move.type === "in" ? `+${move.quantity}` : `-${move.quantity}`}</td>
                                <td>{move.category}</td>
                                <td>{move.created_at}</td>
                                <td>{move.description}</td>
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

export default Movements;
