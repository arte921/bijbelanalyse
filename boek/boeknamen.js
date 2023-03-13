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

console.log(bijbel.split("\n").map(v => {
    const hoofdstukNaam
})