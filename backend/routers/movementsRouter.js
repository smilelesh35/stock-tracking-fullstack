import express from "express";
import postgresClient from "../config/db.js";
import {authMiddleware} from "../middlewares/jwtmiddleware.js";
const router = express.Router();

router.post("/add",authMiddleware ,async(req, res) => {
    try{


        const { code, type, count, description } = req.body;
        const productResult = await postgresClient.query(
            `SELECT * FROM products WHERE code = $1 AND user_id = $2`,
            [code,req.user.id]
        );

        const product = productResult.rows[0];


        if (!product) {
            return res.status(400).json({message:"ürün bulunamadı"})
        }
        let newStock;

        if(type === 'in'){
            newStock = Number(product.stock) + Number(count);
        }
        else if(type === 'out'){
            newStock = Number(product.stock) - Number(count);
        }else{
            return res.status(400).json({ message: "Geçersiz işlem tipi" });

        }


        if(newStock<0){
            return res.status(400).json({ message: "Stok eksiye düşemez" });
        }

        const updatedProduct = await postgresClient.query(
            `UPDATE products SET stock=$1 WHERE id = $2 AND user_id = $3 RETURNING *`,
            [newStock,product.id,req.user.id],
        )

        const movement= await postgresClient.query(
            `INSERT INTO movements (user_id ,product_id ,type,quantity,description)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING
                 id,
                 user_id,
                 product_id,
                 type,
                 quantity,
                 description,
                 to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
            `,
            [req.user.id,product.id,type,Number(count),description]
        )


        res.status(201).json({
            movement: movement.rows[0],
            product: updatedProduct.rows[0],
            message: "Hareket eklendi"
        });

    }catch{
        res.status(400).json({ message: "Something went wrong" });
    }
})
router.get("/",authMiddleware,async(req, res) => {

    try {
        const text = `    SELECT
                              movements.id,
                              products.name,
                              products.code,
                              products.category,
                              movements.type,
                              movements.quantity,
                              movements.description,
                              to_char(movements.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
                          FROM movements
                                   JOIN products ON movements.product_id = products.id
                          WHERE movements.user_id = $1
                          ORDER BY movements.created_at DESC`;
        const { rows } = await postgresClient.query(text, [req.user.id]);



        res.status(200).json({ movements: rows });

    }catch{
        res.status(400).json({message:'error'})
    }
    })


export default router
