// https://github.com/getbible/v1/blob/master/translations.json

const readJSON = require('./functies/readJSON.js');
const writeTXT = require('./functies/writeTXT.js');
const haalBijbelOp = require('./functies/haalBijbelOp.js');
const loopObject = require('./functies/loopObject.js');
const TekstReferentie = require('./klassen/tekstreferentie.js');

const downloadVertaling = async (vertaling) => {
    const bijbel = await haalBijbelOp(vertaling);

    let alleverzen = [];
    loopObject(bijbel.version, (boek) => {
        loopObject(boek.book, (hoofdstuk) => {
            loopObject(hoofdstuk.chapter, (vers) => {
                const vers_tekst_geen_newline = vers.verse.replace(/\r\n$/, '');
                const tekstReferentie = new TekstReferentie(boek.book_name, hoofdstuk.chapter_nr, vers.verse_nr, vers_tekst_geen_newline);
                const versRegel = `${tekstReferentie.toString()} ${vers_tekst_geen_newline}`;

                alleverzen.push(versRegel);
            });
        });
    });

    writeTXT(alleverzen.join("\n"), vertaling);
};

(async () => {
    const vertalingen = await readJSON('translations');
    
    loopObject(vertalingen, (vertaling) => {
        downloadVertaling(vertaling.filename);
    })
})();
