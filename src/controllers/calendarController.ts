import { Request, Response } from "express";
import { scrapeYear } from "../services/scraperService";

export const getCalendarByYear = async (req: Request, res: Response) => {
  try {
    const year = Number(req.params.year);

    if (!year) {
      return res.status(400).json({ error: "Invalid year" });
    }

    const data = await scrapeYear(year);

    res.json({
      year,
      months: data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to scrape data",
      details: error.message,
    });
  }
};
