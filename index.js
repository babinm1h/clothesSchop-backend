import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import { router } from "./routes/index.js"
import cors from "cors"


const PORT = process.env.PORT | 7777
const app = express()


app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_HOST || `http://localhost:3000`
}))
app.use(`/api`, router)



const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI,)
        app.listen(PORT, () => console.log(`${PORT} running`))
    } catch (err) {
        console.log(err);
    }
}
start()