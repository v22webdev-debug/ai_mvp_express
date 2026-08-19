import express from "express"
import { handle_prompt } from "../controllers/Controller.js"

const router = express.Router()

router.post("/handle_prompt", handle_prompt)

export default router