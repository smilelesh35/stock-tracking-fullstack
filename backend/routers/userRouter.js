import express from "express";
import postgresClient from "../config/db.js";
import jwt from "jsonwebtoken";


const router = express.Router();




router.post('/register', async (req, res) => {
    try{
        const name = req.body.name?.trim();
        const password = req.body.password;

        if (!name || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const text = `INSERT INTO stockusers (name, password) VALUES ($1, crypt($2,gen_salt('bf'))) RETURNING id, name`;
        const values = [name, password];
        const {rows} = await postgresClient.query(text, values);




        const token = jwt.sign(
            {
                id: rows[0].id,
                name: rows[0].name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(201).json({
            user: rows[0],
            token

        });


    }catch(e){
        console.error(e);
        return res.status(400).json({ message: "Something went wrong" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const password = req.body.password;

        if (!name || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const text = 'SELECT id, name FROM stockusers WHERE lower(name) = lower($1) AND password = crypt($2,password)';
        const values = [name, password];
        const {rows} = await postgresClient.query(text, values);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            {
                id: rows[0].id,
                name: rows[0].name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        )

        return res.status(200).json({
            user :rows[0],
            token
        })

    }catch(e){
        console.error(e);
        return res.status(400).json({ message: "Something went wrong" });
    }
})
export default router;
