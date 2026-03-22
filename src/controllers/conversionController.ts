import { Request, Response } from "express";
import { chromium } from "playwright";
import { AD_MONTH_MAPPING, convertNepNumberToEng } from "../utils/nepaliUtils";

export const getMonthConversions = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res
        .status(400)
        .json({ error: "Year and month query parameters are required" });
    }

    const browser = await chromium.launch({ headless: true });

    const url = `https://www.hamropatro.com/calendar/${year}/${month}`;

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const items = page.locator("ul.dates.clearfix li:not(.disable)");

    const result = [];

    const count = await items.count();

    const engMonthSection = await page.locator("li.marginCalender span.newDateText.headderNew").nth(1).innerText()

    const engMonthSelectionArray = engMonthSection?.split(" ")?.[0]?.split("/");
    const engYearSelectionArray = engMonthSection?.split(" ")?.[1]?.split("-");

    let engMonthCurrentSection = 0

    for (let i = 0; i < count; i++) {
      const li = items.nth(i);

      const nep = await li.locator("span.nep").textContent();
      const eng = await li.locator("span.eng").first().textContent();

      if(eng === "1") {
        engMonthCurrentSection = 1
      }
      result.push({
        nep: `${year}-${month}-${convertNepNumberToEng(nep?.trim())}`,
        eng: `${engYearSelectionArray?.length > 1 ? engYearSelectionArray?.[engMonthCurrentSection] : engYearSelectionArray?.[0]}-${AD_MONTH_MAPPING[engMonthSelectionArray?.[engMonthCurrentSection]?.toLowerCase()]}-${eng?.trim()}`,
      });
    }

    res.json({
      result,
      query: { year, month },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch conversions",
      details: error.message,
    });
  }
};
