import fs from "fs/promises";

Array.prototype.group = function(callback) {
    return this.reduce((acc, element) => {
        const key = callback(element);
        acc[key] = acc[key] ?? [];
        acc[key].push(element);
        return acc;
    }, {});
};

const regex = /([A-Za-z0-9 ]+?) ([0-9]+) ([0-9]+) ([^0-9]+)/;

console.log(`<div style="word-wrap: break-word; font-size:8pt">${Object.entries((await fs.readFile("in.txt")).toString().split("\n").group((r) => r.replace(regex, "$1 $2"))).map(([hoofdstuk, verzen]) => [
    ``,    
    `<br><br><b>${hoofdstuk}</b><br>`,
        // verzen.map((r) => {
        //     const versnr = r.replace(regex, "$3");
        //     const tekst = r.replace(regex,  "$4");
        //     return `${versnr.padStart(3)} ${tekst}`.replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, '$1\n    ')
        // })
        verzen.map((r) => {
            const versnr = r.replace(regex, `<sup style="font-size:.7em">$3</sup> $4`);
            return versnr;
        }).join(" ")
    ]).flat(10).join("\n")}</div>`)