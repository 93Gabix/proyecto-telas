const { app, BrowserWindow, Menu, ipcMain } = require('electron')


const path = require('path')
const url = require('url')

if (process.env.NODE_ENV !== 'production') { //Para saber en que parte del desarrollo estamos
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

// Pantalla principal
let mainWindow
    // Pantalla de crear producto
let newProductWindow
    // Pantalla de eliminar producto
let DeleteProductWindow


// Esto se inicia al estar 'ready', con el path busca la carpeta src y ejecuta el index.html como pantalla principal
app.on('ready', () => {
    mainWindow = new BrowserWindow({
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

    //Cuando la ventana principal se cierre, se cerrará la app
    mainWindow.on('closed', () => {
        app.quit();
    })
    const mainMenu = Menu.buildFromTemplate(templateMenu) //Crea un menú a partir de un arreglo que diseñemos(la navegacion)
        //Se guarda en una const, para luego aplicarselo al setApplicationMenu
    Menu.setApplicationMenu(mainMenu)
})


//se encarga de crear una nueva interfaz para crear un formulario para crear nuevo producto
function createInsumosWindows() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 350,
        title: 'Agregar Nuevo Insumo',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    })
    newProductWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'view/newinsumo.html'),
            protocol: 'file',
            slashes: true,
        }))
        // para que no aparezca el mimso nav que la pantalla principal // Se comenta por el momento para desarrollar
        //newProductWindow.setMenu(null)

}

// function DeleteProductsWindows() {
//     DeleteProductWindow = new BrowserWindow({
//         width: 400,
//         height: 330,
//         title: 'Eliminar Productos',
//         webPreferences: {
//             nodeIntegration: true,
//             nodeIntegrationInWorker: true
//         }
//     });
//     //DeleteProductWindow.setMenu(null);
//     DeleteProductWindow.loadURL(url.format({
//         pathname: path.join(__dirname, 'view/list-product.html'),
//         protocol: 'file',
//         slashes: true,
//     }))
// }



// Obtenemos los datos de new-product.html y los enviamos al index.html

ipcMain.on('product:new', (event, newProduct) => {
    //podemos chequear que los valores son los correctos en la consola del visual
    //console.log(newProduct);
    // Se envía por mainWindow con webContents los datos obtenidos y luego cerramos la pantalla newProductWindow 
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
})



//Arreglo creado
const templateMenu = [

    {
        label: 'Crear',
        submenu: [{
                label: 'Crear Insumos',
                accelerator: 'Ctrl+N', //Atajo 
                click() {
                    createInsumosWindows();
                }
            },
            {
                label: 'Crear Proveedores',
                accelerator: 'Ctrl+P', //Atajo 
                click() {

                }
            },
            {
                label: 'Crear Tipos de Proveedores',
                accelerator: 'Ctrl+P', //Atajo 
                click() {

                }
            },
            {
                label: 'Crear Partes',
                accelerator: 'Ctrl+P', //Atajo 
                click() {

                }
            },
            {
                label: 'Crear Productos',
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
                label: 'Proveedores',
            },
            {
                label: 'Tipos de Proveedores',
            },
            {
                label: 'Partes',
            },
            {
                label: 'Productos',
            }
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