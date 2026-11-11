// Regression check: Reveal panels must become visible at every viewport width.
// Bug: initial clipPath inset(0 100% 0 0) zeroed the intersection area, so
// whileInView never fired and cards stayed at opacity 0 on narrow viewports.
const { chromium } = require('playwright');

const URL = process.env.URL || 'http://localhost:5210';
const WIDTHS = [
  [360, 800], [390, 844], [414, 896], [540, 720],
  [768, 1024], [1024, 768], [1440, 900],
];

(async () => {
  const browser = await chromium.launch();
  let failed = 0;

  for (const [w, h] of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(`${URL}/archive`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    const first = await page.evaluate(() => {
      const el = document.querySelector('.archive__grid > div');
      if (!el) return null;
      return {
        opacity: getComputedStyle(el).opacity,
        imgW: el.querySelector('img')?.naturalWidth ?? 0,
      };
    });

    // count how many of the first 6 panels are actually opaque
    const visible = await page.evaluate(() => {
      return [...document.querySelectorAll('.archive__grid > div')]
        .slice(0, 6)
        .filter((el) => getComputedStyle(el).opacity === '1').length;
    });

    const ok = first && first.opacity === '1' && visible >= 2;
    if (!ok) failed += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${w}x${h}  opacity=${first?.opacity}  imgNatW=${first?.imgW}  opaquePanels=${visible}/6`
    );
    await page.close();
  }

  await browser.close();
  console.log(failed === 0 ? '\nALL PASS' : `\n${failed} viewport(s) FAILED`);
  process.exit(failed === 0 ? 0 : 1);
})();
