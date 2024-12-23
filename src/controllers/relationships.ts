import { Router } from "express";
import { deadliestRegions, groupByYear, topGroups } from "../routes/relationships";

const router = Router();

router.get("/top-groups", topGroups);

router.get("/groups-by-year", groupByYear);

router.get("/deadliest-regions", deadliestRegions);



export default router;
