const { getConnection } = require('../database');
const { v4 } = require('uuid');

const { Insumo } = require('../models/insumo');

const getInsumos = (mainWindow) => {
    const insumos = getConnection().get('insumos').filter({ deleted: false }).value();
    mainWindow.webContents.send('product:getInsumos', insumos);
}

const getInsumo = (insumoId) => {
    const insumo = getConnection().get('insumos').find({ id: insumoId }).value();
    return insumo;
}

const createInsumo = (insumo) => {
    const { name, providerName, date, priceCm, priceCmUnit } = insumo;
    const id = v4();

    const newInsumo = new Insumo(id, name, providerName, date, priceCm, priceCmUnit);

    getConnection().get('insumos').push(newInsumo).write();
}

const updateInsumo = (insumoUpdated) => {
    getConnection().get('insumos').find({ id: insumoId }).assign(insumoUpdated).value();
}

const deleteInsumo = (insumoId) => {
    getConnection().get('insumos').find({ id: insumoId }).assign({ deleted: true }).write();
}

module.exports = {
    getInsumos,
    getInsumo,
    createInsumo,
    updateInsumo,
    deleteInsumo
}