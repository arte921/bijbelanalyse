class TekstReferentie {
    constructor(boek, hoofdstuk, vers, inhoud) {
        this.boek = boek;
        this.hoofdstuk = hoofdstuk;
        this.vers = vers;
        this.inhoud = inhoud;
    }
    
    toString() {
        return `${this.boek} ${this.hoofdstuk} ${this.vers}`;
    }
}

module.exports = TekstReferentie;