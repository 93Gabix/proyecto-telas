const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

let db;

function createConnection() {
    const adapter = new FileSync('db/db.json');
    db = low(adapter);
    db.defaults({ insumos: [] }).write();
}

const getConnection = () => db;

// exports.addInsumo = (insumo) => {

    

//     const { name, nameProv, fecha, priceCm, priceCmu } = insumo;

//     let id = 1;

//     db.get('insumos')
//         .push({
//             id: id,
//             name: name,
//             proveedor: nameProv,
//             fecha: fecha,
//             precioPorCM: priceCm,
//             percioPorUnidad: priceCmu
//         }).write();
// }

module.exports = {
    createConnection,
    getConnection
}


