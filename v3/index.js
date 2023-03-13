import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
};

const allesUit = async (url, selector, callback) => await (await page(url)).evaluate(`Array.from(document.querySelectorAll("${selector}")).map(${callback.toString()})`)

const boeken = async (testament) => allesUit(testament, `#inhoud > tbody > tr > td a`, b => b.href);
const hoofdstukken = async (boek) => allesUit(boek, `#boeklijst > div > a`, b => [b.href, b.innerText]);
const verzen = async (hoofdstuk) => allesUit(hoofdstuk, `#tekst > p`, l => l.innerText);


// console.log(await boeken(`https://www.statenvertaling.net/nieuwe-testament.html`));
// console.log(await hoofdstukken(`https://www.statenvertaling.net/bijbel/judas.html`));
// console.log(await verzen(`https://www.statenvertaling.net/bijbel/rome/6.html`));

console.log((await Promise.all([
    `https://www.statenvertaling.net/oude-testament.html`,
    `https://www.statenvertaling.net/nieuwe-testament.html`
].map(async (testament) => (await Promise.all((await boeken(testament)).map(async (boek) =>
    await Promise.all((await hoofdstukken(boek)).map(async ([hoofdstukurl, hoofdstuknaam]) =>
        (await verzen(hoofdstukurl)).map((vers) => `${hoofdstuknaam} ${vers}`)
    ))
)))))).flat(5).join("\n"));





await browser.close();