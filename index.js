const readJSONSync = require('./functies/readJSONSync.js');
const {
    loopObject,
    objectNaarArray
} = require('./functies/loopObject.js');

const {
    TekstReferentie
} = require('./klassen/tekstreferentie.js');

const {
    Woord
} = require('./klassen/woord.js');

const bijbel = readJSONSync('statenvertaling');

const boeken = bijbel.version;

const voorkomsten = {};

loopObject(boeken, (boek) => {
    loopObject(boek.book, (hoofdstuk) => {
        loopObject(hoofdstuk.chapter, (vers) => {
            const vers_tekst = vers.verse;

            const tekstReferentie = new TekstReferentie(boek.book_name, hoofdstuk.chapter_number, vers.verse_number);

            const vers_tekst_geen_newline = vers_tekst.replace(/\r\n$/, '');


            const woorden = vers_tekst_geen_newline
                .split(/[^A-Za-z]+/)
                .filter((woord) => woord.length > 0);

            const woorden_lowercase = woorden.map((woord) => woord.toLowerCase());

            for (const woord of woorden_lowercase) {
                const voorkomst = voorkomsten[woord];
                if (voorkomst) {
                    voorkomst.nieuweVoorkomst(tekstReferentie);
                } else {
                    voorkomsten[woord] = new Woord(tekstReferentie, woord);
                }
            }
        })
    })
});

const voorkomsten_array = objectNaarArray(voorkomsten)
    .map((waarde) => waarde.waarde);

voorkomsten_array.sort((a, b) => {
    if (a.aantal == b.aantal) {
        if (a.woord < b.woord) {
            return -1
        } else {
            return 1
        }
    } else {
        return b.aantal - a.aantal;
    }
});

const voorkomsten_csv = voorkomsten_array
    .map((voorkomst) => voorkomst.csv())
    .join('\n');

console.log(voorkomsten_csv);