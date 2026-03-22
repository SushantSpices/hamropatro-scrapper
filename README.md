# Hamro Patro Scraper

A modern Node.js/TypeScript API and CLI tool to scrape Nepali calendar (Bikram Sambat) data from Hamro Patro using Playwright.

## Features

- **Parallel Scraping**: Uses Playwright to scrape all 12 months in parallel for high performance.
- **REST API**: Simple Express-based API to fetch month lengths for any BS year.
- **CLI Mode**: Standalone script to get data directly from the terminal.
- **Clean Architecture**: Modular structure with dedicated controllers, routes, and services.

## Project Structure

```text
src/
├── controllers/      # Request handlers
├── routes/           # API route definitions
├── services/         # Business logic (scraping)
├── utils/            # Helper functions (Nepali digits, etc.)
├── app.ts            # Express application setup
└── server.ts         # Server entry point
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

### Running the Project

- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Build the project:**
  ```bash
  npm run build
  ```
- **Start the production server:**
  ```bash
  npm start
  ```
- **Run the CLI scraper:**
  ```bash
  npx tsx src/scrapeYear.ts
  ```

## API Documentation

### Get Calendar Data

Returns the number of days in each of the 12 months for a specific Bikram Sambat year.

- **URL:** `/calendar/:year`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content Example:** `GET http://localhost:8000/calendar/2082`
    ```json
    {
      "year": 2082,
      "months": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]
    }
    ```

- **Error Response:**
  - **Code:** 400 (Invalid year)
  - **Code:** 500 (Failed to scrape data)

### Get Date Conversions

Returns the mapping of Nepali (BS) dates to English (AD) dates for a specific month of a BS year.

- **URL:** `/conversions`
- **Method:** `GET`
- **Query Parameters:**
  - `year`: Bikram Sambat year (e.g., `2081`)
  - `month`: Bikram Sambat month index (1-12)
- **Success Response:**
  - **Code:** 200
  - **Content Example:** `GET http://localhost:8000/conversions?year=2081&month=1`
    ```json
    {
      "result": [
        {
          "nep": "2081-1-1",
          "eng": "2024-4-13"
        },
        ...
      ],
      "query": {
        "year": "2081",
        "month": "1"
      }
    }
    ```

- **Error Response:**
  - **Code:** 400 (Missing year or month)
  - **Code:** 500 (Failed to fetch conversions)

## License

ISC
