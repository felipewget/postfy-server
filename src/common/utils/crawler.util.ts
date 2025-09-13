import * as puppeteer from 'puppeteer'; // @TODO use pupetter cluster or other thing

export const scrapeTextFromLink = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const text = await page.evaluate(() => document.body.innerText);

    return text;
  } finally {
    await browser.close();
  }
}
