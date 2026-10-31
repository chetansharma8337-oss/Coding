// Renders the site's background artwork from art.html into public/images.
// Run with: node scripts/art/render.js   (needs Playwright with Chromium installed)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const scenes = [
  ["globe", 2400, 1500, "digital-globe.jpg"],
  ["streams", 2400, 1350, "digital-streams.jpg"],
  ["mesh", 2400, 1100, "digital-grid.jpg"],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "art.html"));
  for (const [name, w, h, file] of scenes) {
    const url = await page.evaluate(([n, w, h]) => {
      window.render(n, w, h);
      return document.getElementById("c").toDataURL("image/jpeg", 0.84);
    }, [name, w, h]);
    fs.writeFileSync(path.join(__dirname, "..", "..", "public", "images", file), Buffer.from(url.split(",")[1], "base64"));
    console.log("wrote", file);
  }
  await browser.close();
})();
