class Woord {
    constructor(tekstReferentie, woord) {
        this.woord = woord;
        this.aantal = 1;
        this.plaatsen = [
            tekstReferentie
        ];
    }

    nieuweVoorkomst(tekstReferentie) {
        this.aantal++;
        this.plaatsen.push(tekstReferentie);
    }

    samenvatting() {
        return {
            woord: this.woord,
            aantal: this.aantal
        };
    }
}

module.exports = {
    Woord
};