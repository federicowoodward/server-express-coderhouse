const fs = require('fs');
const moment = require('moment');
// POST: '/' - Crea un carrito y devuelve su id.
// DELETE: '/:id' - Vacía un carrito y lo elimina.

let carritos = []
let urlArchivo = `./carritos.txt`

try { 
    carritos = JSON.parse(fs.readFileSync(urlArchivo, "utf8"));
}
catch {
    carritos = [];
    fs.writeFileSync(urlArchivo, JSON.stringify([]))
}

exports.crearCarrito = () => {
    let carrito = {
        "timestamp": moment().format("yyyy-MM-ddd HH:mm:ss a"),
        "productos": [],
    }
    //  para evitar creaccion de doble carrito al mismo cliente generar el if con local storage del lado del cliente
    let id = carritos.length> 0 ? parseInt(carritos[carritos.length-1].id) + 1 : 1;
    carrito.id = id;
    carritos.push(carrito);
    let bandera = true
    try {
        fs.writeFileSync(urlArchivo, JSON.stringify(carritos))
    } catch (e) {
        bandera = false;
        console.error(e)
    }
    if (bandera) {
        return id;
    } else {
        return "fallo"
    }
}

exports.borrarCarrito = (id) => {
    if (carritos.some(carrito => carrito.id === Number(id))) {
        const resultado = carritos.filter(carrito => carrito.id !== Number(id))
        carritos = resultado
        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify(resultado))
        } catch (e) {
            bandera = false
            console.log(e)
        }
        if (bandera) {return"Carrito borrado"}
    } else {
        return"Este carrito no existe!"
    }
}
// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
// id, timestamp(carrito), carritos: { id, timestamp(carrito), nombre, descripcion, código, foto (url), precio, stock }
exports.listarProductos = (id) => {
    carritos.map((carrito) => {
        if ( carrito.id === Number(id)) {
            console.log(carrito.productos)
        }
    })
}
exports.agregarProductos = (productos, idCarrito) => {
    productos.map((producto) => {
        carritos.map((carrito) => {
            if ( carrito.id === Number(idCarrito)) {
                // console.log(carrito)
                // console.log(carrito.productos)
                carrito.productos.push(producto);
                carritos.push(carrito);
                fs.writeFileSync(urlArchivo, JSON.stringify(carrito))
            }
        })
    })
}
// [{"timestamp":"2022-10-Mon 23:46:13 pm","productos":[{"name": "aaa", "id": 1}, {"name": "aaa", "id": 2}],"id":1}]
exports.borrarProductoPorId = (idProd, idCarrito) => {
    const nuevosCarritos = carritos.filter(carritos => carritos.id !== Number(idCarrito))
    carritos.map((carrito) => {
        let carritoActualizado = {};
            if (carrito.id === Number(idCarrito)) {
                const nuevoProductos = carrito.productos.filter(producto => producto.id !== Number(idProd))
                // console.log(nuevoProductos)
                carritoActualizado.timestamp = carrito.timestamp
                carritoActualizado.id = carrito.id
                carritoActualizado.productos = nuevoProductos
                // carrito.productos = resultad
                // let bandera = true
                // try {
                    //     fs.writeFileSync(urlArchivo, JSON.stringify(resultado))
                    // } catch (e) {
                        //     bandera = false
                        //     console.log(e)
                        // }
                        // if (bandera) {return"Producto borrado"}
                    }
                    nuevosCarritos.push(carritoActualizado)
                })
    nuevosCarritos.pop()
    console.log(nuevosCarritos)
                
}

// res.header('Access-Control-Allow-Credentials', 'true');
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');