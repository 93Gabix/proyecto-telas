const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const path = require('path')
const url = require('url')

const { createConnection } = require('./database');
createConnection();

const { getInsumos, getInsumo, createInsumo, updateInsumo, deleteInsumo } = require('./controllers/InsumosController');

if (process.env.NODE_ENV !== 'production') { //Para saber en que parte del desarrollo estamos
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

// Pantalla de Inicio
let ViweHome
    // Pantalla principal
let mainWindow
    // Pantalla de crear producto
let newProductWindow




// app.on('ready', () => {
//     ViweHome = new BrowserWindow({
//         webPreferences: {
//             nodeIntegration: true,
//             nodeIntegrationInWorker: true
//         }
//     })
//     ViweHome.loadURL(url.format({
//         pathname: path.join(__dirname, 'view/indexprincipal.html'), //indicar donde la ruta del archivo a cargar en esta ventana
//         protocol: 'file', //Indica el protocolo
//         slashes: true, //
//     }))

//     //Cuando la ventana principal se cierre, se cerrará la app
//     mainWindow.on('closed', () => {
//         app.quit();
//     })
//     const mainMenu = Menu.buildFromTemplate(templateMenu) //Crea un menú a partir de un arreglo que diseñemos(la navegacion)
//         //Se guarda en una const, para luego aplicarselo al setApplicationMenu
//     Menu.setApplicationMenu(mainMenu)
// })



















// Esto se inicia al estar 'ready', con el path busca la carpeta src y ejecuta el index.html como pantalla principal
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        title: 'Telas',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view/Insumos.html'), //indicar donde la ruta del archivo a cargar en esta ventana
        protocol: 'file', //Indica el protocolo
        slashes: true, //
    }))

    
    mainWindow.on('closed', () => {
        app.quit();
    })
    const mainMenu = Menu.buildFromTemplate(templateMenu) //Crea un menú a partir de un arreglo que diseñemos(la navegacion)
    //Se guarda en una const, para luego aplicarselo al setApplicationMenu
    Menu.setApplicationMenu(mainMenu)
})


//se encarga de crear una nueva interfaz para crear un formulario para crear nuevo producto
function createInsumosWindows(title) {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 450,
        minWidth: 400,
        minHeight: 450,
        maxWidth: 400,
        maxHeight: 450,
        minimizable: false,
        frame: false,
        title: title,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });

    newProductWindow.loadURL(url.format({
        pathname: pathName = path.join(__dirname, 'view/newinsumo.html'),
        protocol: 'file',
        slashes: true,
    }));
        // para que no aparezca el mimso nav que la pantalla principal // Se comenta por el momento para desarrollar
        //newProductWindow.setMenu(null)

}

// Obtenemos los datos de new-product.html y los enviamos al index.html

ipcMain.on('product:new', (event, newProduct) => {
    //podemos chequear que los valores son los correctos en la consola del visual
    //console.log(newProduct);
    // Se envía por mainWindow con webContents los datos obtenidos y luego cerramos la pantalla newProductWindow
    // const { name, nameProv, fecha, priceCm, priceCmu } = newProduct;

    // db.addInsumo(newProduct);

    // mainWindow.webContents.send('product:new', newProduct);

    createInsumo(newProduct);
    getInsumos(mainWindow);

    newProductWindow.close();
});

ipcMain.on('product:create', async (event) => {
    createInsumosWindows('Crear Insumo');
});


ipcMain.on('product:edit', async (event, id) => {
    const insumo = getInsumo(id);
    createInsumosWindows('Editar Insumo', insumo);
    setTimeout(() => {
        newProductWindow.webContents.send('product:getInsumo', insumo)
    }, 300);
    
});

ipcMain.on('product:update', (event, insumoUpdated) => {
    updateInsumo(insumoUpdated);
    getInsumos(mainWindow);

    newProductWindow.close();
});

ipcMain.on('product:delete', (event, id) => {
    deleteInsumo(id);
    getInsumos(mainWindow);
});

ipcMain.on('product:getAllInsumos', (event) => {
    getInsumos(mainWindow);
});



//Arreglo creado
const templateMenu = [

    {
        label: 'Crear',
        submenu: [{
                label: 'Crear Insumos',
                accelerator: 'Ctrl+N', //Atajo 
                click() {
                    createInsumosWindows('Crear Nuevo Insumo');
                }
            },
            {
                label: 'Crear Productos',
                accelerator: 'Ctrl+P', //Atajo 
                click() {

                }
            },
            {
                label: 'Crear Partes',
                accelerator: 'Ctrl+P', //Atajo 
                click() {

                }
            }
        ]
    },
    {
        label: 'Vistas',
        submenu: [{
                label: 'Insumos',
            },
            {
                label: 'Productos',
            },
            {
                label: 'Partes',
            },

        ]
    },
    {
        label: 'Salir',
        accelerator: process.platform == 'darwin' ? 'command+S' : 'Ctrl+S', //Sentencia ternaria donde comparamos si es para IOS, ejecuta (command+S) si es otro so ejecuta (Ctrl+S)
        click() {
            app.quit();
        }
    }

]

//Si estamos en produccion aparecera una ventana nueva llamada DevTools y adentro tendrá
//otra pestaña que solo abrirá y cerrará las opciones de desarrollo
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [{
            label: 'Show/Hide Dev Tools',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    })
}

