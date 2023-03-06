import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

// await page.goto('https://www.statenvertaling.net/nieuwe-testament.html');

// await page.$$eval(`#inhoud > tbody > tr > td`, (e) => console.log(e))


await page.goto('https://www.statenvertaling.net/nieuwe-testament.html');
await page.$$eval(`#tekst > p`, (v) => console.log(v));