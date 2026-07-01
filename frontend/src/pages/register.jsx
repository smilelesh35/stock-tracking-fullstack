import React, {useRef, useState} from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../css/register.css";
import {useNavigate} from "react-router";

import axios from "axios";

const Register = () => {

    const [name, setName] = useState("");
    const [password,setpassword] = useState("")
    const [message,setMessage] = useState("");
    const register = async () => {

        const API_URL = `${import.meta.env.VITE_API_URL}/users`
       try {

        const response = await axios.post(`${API_URL}/register`, {
           name: name.trim(),
           password: password,
        })
            const token = response.data.token;

            if (!token) {
                console.log("token not found");
                return;
            }

            localStorage.setItem("token", token);
            navigate("/products");

           console.log(response)
       }catch(err){
           console.log(err)
           setMessage("Kullanıcı adı kullanılıyor , lütfen ismi değiştirip tekrar kayıt olunuz")
       }

    }

    const navigate = useNavigate();
    return (
        <div className="register-page">
            <h1 className="register-logo">Stok Takip</h1>

            <div className="register-card">
                <h2>Kayıt Ol</h2>

                <div className="register-input">
                    <FaUser />
                    <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Kullanıcı adı" />
                </div>

                <div className="register-input">
                    <FaLock />
                    <input type="password" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Şifre" />
                </div>

                <p style={{display:'flex',alignItems:'center',textAlign:'center'}}>{message}</p>


                <p className="register-text">
                    Hesabınız var mı? <span onClick={()=>{navigate('/login')}}>Giriş yap</span>
                </p>

                <button className="register-button" onClick={register} >Kayıt ol</button>
            </div>
        </div>
    );
};

export default Register;
