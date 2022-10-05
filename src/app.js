const express = require('express')
const app = express()
const routerProductos = require(`./routes/routesProducts.js`)
const routerCarrito = require(`./routes/routesCarrito.js`)
const cors = require('cors')
const http = require('http')
// const servidor = http.createServer(app)
// const controladores = require('../src/controladores/controladores.js')
// const validacion = require("./middlewares/middlewares.js")

// server basico:

app.use(`/productos`, routerProductos)
app.use(`/carrito`, routerCarrito)

// // sockets:
// const socketIo = require('socket.io')
// const io = socketIo(servidor, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "HEAD", "POST"]
//     }
// })

// let admin = false
// io.on("connection", socket => {
//     let correo;
// // conexiones del admin 
//     socket.on("adminConectado", (nombre) => {
//         console.log(`admin: ${nombre}, se ha conectado.`)
//         admin = true;
//         io.emit("productos", controladores.verTodos())
//     })
//     // if (admin) {
//         socket.on("crearProducto", (item) => {
//             const controlador = () => {
//                 if (validacion.dataValidation(item) === "OK") {
//                     socket.emit("respuestaCreaccionDeProducto",controladores.crearProducto(item))
//                 }
//                 else {
//                     socket.emit("respuestaCreaccionDeProducto", validacion.dataValidation(item))
//                 }
//             }
//             controlador();
//         })
//     // }


// // conexiones del chat:
//     socket.on("conectado", (nomb) => {
//         correo = nomb;
//         socket.broadcast.emit("mensajes", {nombre: "Sistema", mensaje: `${correo} ha entrado en la sala`})
//     })
    
//     socket.on("mensaje", (correo, mensaje, date) => {
//         io.emit("mensajes", {correo, mensaje, date});
//     })

//     socket.on("necesitoProductos", () => {
//         io.emit("productos", controladores.verTodos())
//     })

//     socket.on("nuevoProducto", (producto) => {
//         io.emit("productoAgregado", controladores.save(producto))
//         io.emit("productos", controladores.verTodos())
//     })
    
//     socket.on("disconnect", () => {
//         io.emit("mensajes", {nombre: "Sistema", mensaje: `${correo} ha abandonado la sala`});
//     })

// });

module.exports = app;