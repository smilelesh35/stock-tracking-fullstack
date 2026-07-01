import React, {useState} from "react";
import "../css/login.css";
import { FaUser, FaLock } from "react-icons/fa";
import {useNavigate} from "react-router";

import axios from "axios";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        setErrorMessage("");
        const API_URL = `${import.meta.env.VITE_API_URL}/users`
        try {
            const response =  await axios.post(`${API_URL}/login`, {
                name: name.trim(),
                password: password,
            })
            const token = response.data.token;

            if (!token) {
                console.log("token not found");
                return;
            }
           localStorage.setItem("token",token);
           navigate("/products");
            console.log(response)
        }catch(err) {
            if (err.response?.status === 401) {
                setErrorMessage("Kullanıcı adı veya şifre hatalı");
                return;
            }

            setErrorMessage("Giriş yapılırken bir hata oluştu");
        }

    }
    return (
        <div className="login-page">
            <h1 className="login-logo">Stok Takip</h1>

            <div className="login-card">
                <h2>Giriş Yap</h2>

                <div className="login-input">
                    <FaUser />
                    <input type="text" onChange={(e)=>{setName(e.target.value); setErrorMessage("");}} placeholder="Kullanıcı adı" />
                </div>

                <div className="login-input">
                    <FaLock />
                    <input type="password" onChange={(e)=>{setPassword(e.target.value); setErrorMessage("");}} placeholder="Şifre" />
                </div>

                {errorMessage && <p className="login-error">{errorMessage}</p>}

                <p className="register-text">
                    Hesabınız yok mu? <span onClick={()=>{navigate('/register')}}>Kayıt ol</span>
                </p>

                <button className="login-button" onClick={login}>Giriş yap</button>
            </div>
        </div>
    );
};

export default Login;
