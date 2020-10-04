class Insumo {
    constructor(id, name, date, priceCm, priceCmUnit) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.priceCm = priceCm;
        this.priceCmUnit = priceCmUnit;
        this.deleted = false;
    }
}

module.exports = { Insumo } ;