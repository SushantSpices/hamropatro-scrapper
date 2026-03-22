import { Router } from "express";
import { getMonthConversions } from "../controllers/conversionController";

const router = Router();

router.get("/", getMonthConversions);

export default router;
