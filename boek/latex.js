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
    `\\documentclass[fontsize=11pt,paper=a5,pagesize=auto]{scrbook}`,
    `\\usepackage[utf8]{inputenc}`,
    `\\usepackage[T1]{fontenc}`,
    `\\usepackage{lmodern}`,
    `\\usepackage{microtype}`,
    `\\frenchspacing`,
    `\\begin{document}`,
    Object.entries(bijbel.split("\n").group((l) => l.replace(regex, "$1$2"))).slice(-2).map(([hoofdstuk, verzen]) => [
        `\\chapter{${hoofdstuk}}`,
        verzen.map((vers) => {
            const versnummer = vers.replace(regex, "$3");
            const versinhoud = vers.replace(regex, "$4");
            return `$^{${versnummer}}$ ${versinhoud}`;
        }).join(" ")
    ]),
    `\\end{document}`,
].flat(10).join("\n"))