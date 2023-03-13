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

console.log(Object.keys(bijbel.split("\n").group(l => l.replace(regex, "$1: $1"))).join("\n"));

// console.log("3 Johannes 15 Vrede zij u. De vrienden groeten u. Groet de vrienden met name.".replace(regex, "$1"))