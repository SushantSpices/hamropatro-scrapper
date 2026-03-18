"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const BS_MONTHS = [
    "वैशाख",
    "जेठ",
    "असार",
    "साउन",
    "भदौ",
    "असोज",
    "कार्तिक",
    "मंसिर",
    "पुष",
    "माघ",
    "फागुन",
    "चैत",
];
const EN_TO_NP_DIGIT = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
};
const NP_TO_EN_DIGIT = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
};
function toNepaliDigits(value) {
    return String(value).replace(/\d/g, (d) => EN_TO_NP_DIGIT[d]);
}
function nepaliDigitsToNumber(value) {
    const english = value.replace(/[०-९]/g, (d) => NP_TO_EN_DIGIT[d]);
    return Number(english);
}
function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getExpectedDaySet(dayCount) {
    return Array.from({ length: dayCount }, (_, i) => i + 1);
}
async function scrapeSingleMonth(page, bsYear, monthNumber) {
    const url = `https://www.hamropatro.com/calendar/${bsYear}/${monthNumber}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    // Direct selector count
    const count = await page.locator("ul.dates.clearfix li:not(.disable)").count();
    if (count === 0) {
        throw new Error(`No valid days found for ${bsYear}-${monthNumber}`);
    }
    return count;
}
async function scrapeBsYear(bsYear) {
    const browser = await playwright_1.chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        const monthLengths = [];
        for (let month = 1; month <= 12; month++) {
            const dayCount = await scrapeSingleMonth(page, bsYear, month);
            monthLengths.push(dayCount);
            console.log(`${bsYear}-${month} => ${dayCount}`);
        }
        return monthLengths;
    }
    finally {
        await browser.close();
    }
}
async function main() {
    const bsYear = 2083;
    const result = await scrapeBsYear(bsYear);
    console.log("\nFinal array:");
    console.log(result);
    // If you later want the object form:
    // console.log(JSON.stringify({ [bsYear]: result }, null, 2));
}
main().catch((error) => {
    console.error("Scraping failed:", error);
    process.exit(1);
});
