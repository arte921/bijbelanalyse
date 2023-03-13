Array.prototype.group = function(callback) {
    return this.reduce((acc, element) => {
        const key = callback(element);
        acc[key] = acc[key] ?? [];
        acc[key].push(element);
        return acc;
    }, {});
};

const regex = /^([\p{L}\p{M}0-9 ]+?)( [0-9]+)? ([0-9]+) ([^0-9]+)$/ui;

import fs from "fs";

const bijbel = fs.readFileSync(0).toString();

console.log([
    // `
    // <style>
    //     h2 {
    //         border-bottom: 0px;
    //     }
    //     </style>
    // `,
    Object.entries(bijbel.split("\n").group((l) => l.replace(regex, "$1$2"))).map(([hoofdstuk, verzen]) => [
        `<h2>${hoofdstuk}</h2>`,
        `<p>`,
        verzen.map((vers) => {
            const versnummer = vers.replace(regex, "$3");
            const versinhoud = vers.replace(regex, "$4");
            return `<sup><sub>${versnummer}</sub></sup> ${versinhoud}`;
        }).join(" "),
        `</p>`
    ]),
].flat(10).join("\n"))