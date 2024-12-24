import { Router } from "express";
import { create } from "../controllers/attackController";

const router = Router();

router.post("create-event", create)

export default router;
