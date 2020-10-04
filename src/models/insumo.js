class Insumo {
    constructor(id, name, providerName, date, priceCm, priceCmUnit) {
        this.id = id;
        this.name = name;
        this.providerName = providerName;
        this.date = date;
        this.priceCm = priceCm;
        this.priceCmUnit = priceCmUnit;
        this.deleted = false;
    }
}

module.exports = { Insumo } ;