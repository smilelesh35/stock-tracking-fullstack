
import express from 'express'
import postgresClient from './config/db.js'
import users from './routers/userRouter.js'
import products from './routers/productsRouter.js'
import Movements from './routers/movementsRouter.js'
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json())
app.use("/users",users)
app.use("/products",products)
app.use("/movements",Movements)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    postgresClient.connect((err) => {
        if (err) {
            console.log(err)
        }
        else{
            console.log("db connected successfully")
        }
    })

})
