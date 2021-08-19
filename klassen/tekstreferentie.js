class TekstReferentie {
    constructor(boek, hoofdstuk, vers) {
        this.boek = boek;
        this.hoofdstuk = hoofdstuk;
        this.vers = vers;
    }

    toString() {
        return `${this.boek} ${this.hoofdstuk} ${this.vers}`;
    }
}

module.exports = {
    TekstReferentie
};