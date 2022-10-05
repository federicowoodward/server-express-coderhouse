const fs = require('fs');

let productos = undefined;
let urlArchivo = "./productos.txt";

try { 
    productos = JSON.parse(fs.readFileSync(urlArchivo, "utf8"));
}
catch {
    productos = [];
    fs.writeFileSync(urlArchivo, JSON.stringify([]))
}
exports.verTodos = () => {
    return productos;
}

exports.verPorId = (id) => {
    let producto = productos.find(producto => producto.id == id);
    if (producto === undefined) {
        return null;
    } else {
        return producto;
    }
}

exports.crearProducto = (item) => {
    if (productos.some(producto => producto.codigo == item.codigo)) {
        return ("failed")
    } else {
        let id = productos.length> 0 ? parseInt(productos[productos.length-1].id) + 1 : 1;
        item.id = id;
        productos.push(item);
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify(productos))
        } catch (e) {
            console.error(e)
        }
        return id;
    }
}

exports.borrarPorId = (id) => {
    if (productos.some(producto => producto.id === Number(id))) {
        const resultado = productos.filter(producto => producto.id !== Number(id))
        productos = resultado
        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify(resultado))
        } catch (e) {
            bandera = false
            console.log(e)
        }
        if (bandera) {return"Producto borrado"}
    } else {
        return"El item no existe!!"
    }
}

exports.remplazarItem = (item, id) => {
    if (productos.some(producto => producto.id === Number(id))) {
        let itemParaRemplazar = productos.find(el => el.id === Number(id))
        itemParaRemplazar.nombre = item.nombre
        itemParaRemplazar.codigo = item.codigo
        // termionar esto
        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify(productos), "utf-8")
        } catch (e) {
            bandera = false
            console.log(e)
        }
        if (bandera) {
            console.log("Producto remplazado")  
        }
    } else {
        console.log("El item no existe!!")
    }
}