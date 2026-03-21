import { Router } from "express";
import { getCalendarByYear } from "../controllers/calendarController";

const router = Router();

router.get("/:year", getCalendarByYear);

export default router;
