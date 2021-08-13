const readJSONSync = require('./functies/readJSONSync.js');

const bijbel = readJSONSync('statenvertaling');

const boeken = bijbel.version;

let alle_tekst = '';

for (const boeknummer in boeken) {
    const boek = boeken[boeknummer];

    const hoofdstukken = boek.book;

    for (const hoofdstuknummer in hoofdstukken) {
        const hoofdstuk = hoofdstukken[hoofdstuknummer];

        const verzen = hoofdstuk.chapter;

        for (const versnummer in verzen) {
            const vers = verzen[versnummer];

            const vers_tekst = vers.verse;

            const vers_tekst_geen_newline = vers_tekst.replace(/\r\n$/, '');

            alle_tekst += vers_tekst_geen_newline + '\n';
            // console.log(vers_tekst_geen_newline);
        }
    }
}

console.log(alle_tekst);