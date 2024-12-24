import { Router } from "express";
import { createEvent, deleteEvent, updateEvent } from "../controllers/attackController";

const router = Router();

router.post("create-event", createEvent)

router.post("update-event", updateEvent)

router.delete("delete-event", deleteEvent)

export default router;
