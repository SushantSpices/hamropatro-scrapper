import express from "express";
import { chromium, Page } from "playwright";

const app = express();
const PORT = 8000;

// ---------- Your existing function ----------
async function scrapeSingleMonth(
  page: Page,
  bsYear: number,
  monthNumber: number
): Promise<number> {
  const url = `https://www.hamropatro.com/calendar/${bsYear}/${monthNumber}`;

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const count = await page
    .locator("ul.dates.clearfix li:not(.disable)")
    .count();

  if (count === 0) {
    throw new Error(`No valid days found for ${bsYear}-${monthNumber}`);
  }

  return count;
}

// ---------- Scrape full year ----------
async function scrapeYear(bsYear: number): Promise<number[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const results: number[] = [];

    for (let month = 1; month <= 12; month++) {
      const days = await scrapeSingleMonth(page, bsYear, month);
      results.push(days);
    }

    return results;
  } finally {
    await browser.close();
  }
}

// ---------- API ROUTE ----------
app.get("/calendar/:year", async (req, res) => {
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
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});