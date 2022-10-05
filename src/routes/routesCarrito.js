const carrito = require('../controladores/carrito.js');
const express = require("express")
const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// POST: '/' - Crea un carrito y devuelve su id.
// DELETE: '/:id' - Vacía un carrito y lo elimina.
// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

server.post(`/crear`, () => {
    console.log(carrito.crearCarrito())
})
server.delete(`/borrar/:id`, (req) => {
    let id = req.params.id;
    console.log(carrito.borrarCarrito(id))
})
server.get(`/:id/productos`, (req) => {
    let id = req.params.id;
    carrito.listarProductos(id)
})
server.post(`/:id/productos`, async (req) => {
    let idCarrito = req.params.id;
    let productos = req.body;
    console.log(await carrito.agregarProductos(productos, idCarrito))
})
server.delete(`/:id/productos/:idProd`, (req) => {
    let idCarrito = req.params.id;
    let idProd = req.params.idProd;
    carrito.borrarProductoPorId(idProd, idCarrito)
})

module.exports = server;