import express from "express"
import { getAllData } from "../controllers/data.controller.js"

const router = express.Router()

router.get('/getAllData', getAllData)

export default router