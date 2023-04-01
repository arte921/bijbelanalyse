import {
    pcsv,
    pyaml,
    gtxt,
    gcsv,
    gyaml,
    rtxt,
    rcsv,
    ryaml,
    wcsv,
    wyaml,
    wtxt
} from "#f/io.js";
import { o } from "#f/root.js";
import _a from "#f/group.js";
import _b from "#f/ongeveer.js";
import { bijbelregex } from "#f/bijbelregex.js";

// Array.prototype.layer = function(callback, firstValue) {
//     return this.reduce((acc, x, i) => acc.concat(callback(x, (acc[acc.length - 1] || [firstValue])[0], acc, i)), []).map(e => e[1]);
// }

const vervangLaatste = (basis, vervanging) => {
    // console.log(this, array)
    const p = [basis.slice(0, basis.length - vervanging.length), vervanging].flat();
    return p;
}

Array.prototype.findLastIndex = function(callback) {
    const copy = [...this].reverse();
    return this.length - copy.findIndex(callback) - 1;
};

(async () => {

    let context = [];

    const psalmbord = await rtxt(`${o}/psalmbord.txt`);
    const bijbel = await rtxt(`${o}/bijbel.txt`);
    const verzen = bijbel.split("\n");
    const boeknamen = verzen.unique(v => v.replace(bijbelregex, "$1"));

        
    const leesvoer = psalmbord.split(/[\n,]/).map((stuk) => {
        const [begin, einde = begin] = stuk.split(/-/).map((verwijzing) => {
            const p = vervangLaatste(context, verwijzing.split(/ |:/));
            const [boek, ...rest] = (p[1].match(/[a-zA-Z]/) ? p.slice(1) : p).map(e => e.replace(";", "[0-9]+").trim());
            const tekst = [boeknamen.ongeveer(boek), ...rest];
            context = tekst;
            // console.log(context);
            return tekst;
        }).map(v => v.join(" "));

        const [a, b] = ([begin, einde].map(e => verzen.findLastIndex((v) => v.match(new RegExp(`^${e} `)))));
        
        // console.log(begin, einde, a, b, verzen.slice(a, b + 1))
        return verzen.slice(a, b + 1)
    })

    console.log(leesvoer.flat().join("\n"))
})();
