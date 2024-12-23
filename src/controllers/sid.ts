import { Router } from "express";
import {  sid } from "../routes/sid";

const router = Router()

router.post('/sid', sid)

export default router