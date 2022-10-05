// get: localhost:8080/productos
// get id: localhost:8080/productos/2
// crear: localhost:8080/crearProducto/admin + body 
//  borrar: localhost:8080/borrar/admin/id
//  remplazar: localhost:8080/remplazar/admin/id + body
const controladores = require("../controladores/controladores");
const express = require("express")
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/productos',() =>{controladores.verTodos()})
server.get('/productos/:id', (req) => {
    let id = req.params.id
    console.log(controladores.verPorId(id))
})
server.post('/crearProducto/:admin', (req) => {
    let admin = req.params.id
    let item = req.body
    if (admin === "true") {
        console.log(controladores.crearProducto(item))
    } else {
        console.log("No tienes permiso para realizar esta accion.")
    }
})
server.delete('/borrar/:admin/:id', (req) => {
    let admin = req.params.admin
    let id = req.params.id
    if (admin === "true") {
        console.log("Asa")
        console.log(controladores.borrarPorId(id))
    } else {
        console.log("No tienes permiso para realizar esta accion.")
    }
})
server.put('/remplazar/:admin/:id', (req) => {
    let admin = req.params.admin
    let id = req.params.id
    let item = req.body
    if (admin === "true") {
        controladores.remplazarItem(item, id)
    } else {
        console.log("No tienes permiso para realizar esta accion.")
    }
})

module.exports= server;