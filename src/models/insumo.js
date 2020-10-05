
class Insumo {
    constructor(id, name, date, priceCm, priceCmUnit) {
        this.id = id;
        this.name = name.toUpperCase();
        this.date = date;
        this.priceCm = priceCm;
        this.priceCmUnit = priceCmUnit;
        this.deleted = false;
    }
}

module.exports = { Insumo } ;