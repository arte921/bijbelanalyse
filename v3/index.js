import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://www.statenvertaling.net/nieuwe-testament.html');

// console.log(await page.$$eval(`#inhoud > tbody > tr > td`, (e) => e.innerHTML))
await page.goto('https://www.statenvertaling.net/nieuwe-testament.html');
const boeken = (await Promise.all((await page.evaluate(() => Array.from(document.querySelectorAll(`#inhoud > tbody > tr > td > a`)).map(b => b.href))
    ).map(async (boek) => {
        console.log(boek);
        const page = await browser.newPage();
        await page.goto(boek);
        const e = await page.evaluate(() => Array.from(document.querySelectorAll(`#boeklijstkollinks > a`)).map(b => [b.href, b.innerText]))
        await page.close();
        return e;
    }))).map(async (boek) => boek.map(([hoofdstukUrl, hoofdstukNaam]) => {
        const page = await browser.newPage();
        await page.goto(hoofdstukUrl);
        console.log(await page.evaluate(() => Array.from(document.querySelectorAll(`#tekst > p`)).map(l => l.innerText)))
        await page.close();
        return e;
    })







await browser.close();