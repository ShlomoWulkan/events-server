import { Router } from "express";
import { deadliestAttackTypes, highestCasualtyRegions, incidentTrends } from "../controllers/analysisController";

const router = Router();

router.get("/deadliest-attack-types", deadliestAttackTypes);

router.get("/highest-casualty-regions/:region?", highestCasualtyRegions)

router.get("/incident-trends", incidentTrends)

export default router;
