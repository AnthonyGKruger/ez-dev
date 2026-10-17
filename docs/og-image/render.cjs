// Renders docs/og-image/og.html to public/media/og-image.png (1200x630).
// Needs Playwright with Chromium (`npm i -D playwright` or a global install)
// and network access for the Google Fonts it loads.
//   node docs/og-image/render.cjs
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto("file://" + path.join(__dirname, "og.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, "../../public/media/og-image.png") });
  await browser.close();
})();
