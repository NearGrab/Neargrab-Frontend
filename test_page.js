import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));
  
  console.log('Navigating to http://localhost:5173/shops/5startbakery ...');
  await page.goto('http://localhost:5173/shops/5startbakery', { waitUntil: 'networkidle2' });
  
  const content = await page.content();
  console.log('Page title:', await page.title());
  console.log('HTML length:', content.length);
  
  await browser.close();
}

run().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
