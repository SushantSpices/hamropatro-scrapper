export const BS_MONTHS = [
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

export const EN_TO_NP_DIGIT: Record<string, string> = {
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

export const NP_TO_EN_DIGIT: Record<string, string> = {
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

export function toNepaliDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => EN_TO_NP_DIGIT[d]);
}

export function nepaliDigitsToNumber(value: string): number {
  const english = value.replace(/[०-९]/g, (d) => NP_TO_EN_DIGIT[d]);
  return Number(english);
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getExpectedDaySet(dayCount: number): number[] {
  return Array.from({ length: dayCount }, (_, i) => i + 1);
}
