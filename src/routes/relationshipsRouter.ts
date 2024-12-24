import { Router } from "express";
import { allGangs, deadliestRegions, groupByYear, topGroups } from "../controllers/relationshipsController";

const router = Router();

router.get("/top-groups", topGroups);

router.get("/groups-by-year", groupByYear);

router.get("/deadliest-countries", deadliestRegions);

router.get("/all-gangs", allGangs);

export default router;
