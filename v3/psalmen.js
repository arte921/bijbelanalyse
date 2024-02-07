import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const sleep = ms => new Promise(r => setTimeout(r, ms));

const page = async (url) => {
    while (openPages > 1) await sleep(100);
    openPages++;
    const page = await browser.newPage();
    await page.goto(url);
    return page;
};

const querySelectAll = async (p, selector, callback) => await p.evaluate(`Array.from(document.querySelectorAll("${selector}")).map(${callback.toString()})`);

let openPages = 0;
const allesUit = async (url, selector, callback) => {
    const p = await page(url);
    const r = await querySelectAll(p, selector, callback);
    await p.close();
    openPages--;
    return r;
};

// const boeken = async (testament) => allesUit(testament, `#inhoud a`, b => b.href);
// const hoofdstukken = async (boek) => allesUit(boek, `btn-chapter-select`, b => [b.href, b.innerText]);
// const verzen = async (hoofdstuk) => allesUit(hoofdstuk, `#tekst > p`, l => l.innerText);

const psalmen = (await allesUit(`https://psalmboek.nl/zingen.php`, `#opmaakkolom1 > .psletter`, b => [b.href, b.innerText]));
console.log(psalmen.map(([href, nummer]) => {
    
}));
// await Promise.all(hoofdstukken.map(async ([title, url]) => {
//     const teksten = await allesUit(url, `.verse-span > .verse_text`, a => a.innerText);
//     const nummers = await allesUit(url, `.verse-span > .verse_number > .verse_text`, a => a.innerText);
//     console.log(teksten, nummers);
// }))


console.log(psalmen);

// await Promise.all()

// console.log(await boeken(`https://www.statenvertaling.net/nieuwe-testament.html`));
// console.log(await hoofdstukken(`https://www.statenvertaling.net/bijbel/judas.html`));
// console.log(await verzen(`https://www.statenvertaling.net/bijbel/rome/6.html`));

// console.log((await Promise.all([
//     `https://bijbel.nbv21.nl/bijbel/NBV21/WIS.19/?hlh=WIS.19.10`,
// ].map(async (testament) => (await Promise.all((await boeken(testament)).map(async (boek) =>
//     await Promise.all((await hoofdstukken(boek)).map(async ([hoofdstukurl, hoofdstuknaam]) =>
//         (await verzen(hoofdstukurl)).map((vers) => `${hoofdstuknaam} ${vers}`)
//     ))
// )))))).flat(5).join("\n"));





await browser.close();