import { chromium, Page } from "playwright";

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

export async function scrapeYear(bsYear: number): Promise<number[]> {
  const browser = await chromium.launch({ headless: true });

  try {
    const promises = Array.from({ length: 12 }, async (_, i) => {
      const page = await browser.newPage();
      const result = await scrapeSingleMonth(page, bsYear, i + 1);
      await page.close();
      return result;
    });

    return await Promise.all(promises);
  } finally {
    await browser.close();
  }
}
