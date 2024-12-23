const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const cheerio = require("cheerio");

const cookiesPath = path.resolve(__dirname, "linkedin_cookies.json");

async function loadCookies(page) {
  if (!fs.existsSync(cookiesPath)) {
    console.error(`Cookies file not found in path: ${cookiesPath}`);
    throw new Error(
      "Cookies file not found. Log in manually and save cookies."
    );
  }

  const cookies = JSON.parse(fs.readFileSync(cookiesPath, "utf-8"));
  console.log("Cookies loaded:", cookies);
  await page.setCookie(...cookies);
}

app.post("/scrape", async (req, res) => {
  const { profileUrl } = req.body;

  if (!profileUrl) {
    return res.status(400).json({ error: "Profile URL is required" });
  }

  let browser;
  try {
    console.log("Launching Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    const page = await browser.newPage();

    console.log("Loading cookies...");
    await loadCookies(page);
    console.log("Cookies loaded successfully.");

    console.log("Navigating to LinkedIn profile...");
    await page.goto(profileUrl);
    console.log("Navigation successful.");

    console.log("Waiting for profile name element...");
    await page.waitForSelector("h1", { timeout: 60000 });
    console.log("Profile name element found.");

    const pageContent = await page.content();

    const $ = cheerio.load(pageContent);

    console.log("Scraping data...");

    const name = $("h1").text().trim();

    const imageUrl = $("div[class*='photo-wrapper'] img").attr("src");

    const experience = $(".artdeco-list__item")
      .map((i, el) => {
        let degreeText = $(el).text().trim();

        degreeText = degreeText.replace(/\s+/g, " ", " ").trim();

        return degreeText ? degreeText : null;
      })
      .get();

    const education = experience[1];

    let skills = [];
    try {
      skills = $(".text-body-medium")
        .map((i, el) => $(el).text().trim())
        .get();
    } catch (e) {
      console.warn("Skills section not found.");
      skills = [];
    }

    console.log("Scraping completed. Sending response...");

    res.json({ name, imageUrl, experience, education, skills });
  } catch (error) {
    console.error("Error scraping LinkedIn profile:", error);
    res.status(500).json({
      error: "Failed to scrape LinkedIn profile",
      details: error.message,
    });
  } finally {
    if (browser) {
      console.log("Closing Puppeteer...");
      await browser.close();
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
