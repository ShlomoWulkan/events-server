import { Router } from "express";
import { deadliestRegions, groupByYear, topGroups } from "../routes/relationships";
import { create } from "../routes/attack";

const router = Router();

router.post("", create)



export default router;
