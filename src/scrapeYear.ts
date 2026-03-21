import { scrapeYear } from "./services/scraperService";

async function main(): Promise<void> {
  const bsYear = 2083;

  try {
    const result = await scrapeYear(bsYear);

    console.log(`\nFinal array for ${bsYear}:`);
    console.log(result);
  } catch (error) {
    console.error("Scraping failed:", error);
    process.exit(1);
  }
}

main();
