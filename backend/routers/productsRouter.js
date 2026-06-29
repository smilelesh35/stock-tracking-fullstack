import express from "express";

import postgresClient from "../config/db.js";
import {authMiddleware} from "../middlewares/jwtmiddleware.js";

const router = express.Router();

router.post("/add",authMiddleware,async (req, res) => {
    try{
        const {name,code , stock ,category,price} = req.body;

        const text = `
            INSERT INTO products (user_id, name, code, stock, category, price)
            VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (user_id, code)
    DO UPDATE SET
                stock = products.stock + EXCLUDED.stock
                           RETURNING *
        `;
        const values = [req.user.id,name,code,stock,category,price];

        const {rows} = await postgresClient.query(text, values);

        return res.status(201).json({
            product: rows[0],
            message: "Ürün eklendi veya stok güncellendi"
        });
    }catch(err){
        res.status(400).json({message:"Error"});
    }

})

router.get("/",authMiddleware,async (req, res) => {
    try{

        const text = `
            SELECT * FROM products
            WHERE user_id = $1 AND COALESCE(is_deleted, false) = false
            ORDER BY id DESC
        `;
    const values = [req.user.id];

    const {rows} = await postgresClient.query(text, values);
        return res.status(200).json({
            products: rows
        });

    }catch{
        res.status(400).json({message:"Error"});
    }
})
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const text = `
            UPDATE products
            SET is_deleted = true
            WHERE id = $1 AND user_id = $2
                RETURNING *
        `;

        const { rows } = await postgresClient.query(text, [id, req.user.id]);

        res.status(200).json({ product: rows[0] });
    } catch (e) {
        res.status(400).json({ message: "error" });
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        const text = `
            UPDATE products
            SET price = $1
            WHERE id = $2 AND user_id = $3
                RETURNING *
        `;

        const values = [price, id, req.user.id];

        const { rows } = await postgresClient.query(text, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Ürün bulunamadı" });
        }

        return res.status(200).json({
            product: rows[0],
            message: "Ürün güncellendi"
        });

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Error" });
    }
});
export default router;
