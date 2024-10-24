const sql = require('mssql');

class Producto {
    constructor(producto) {
        this.name = producto.name;
        this.description = producto.description;
        this.price = producto.price;
        this.stock = producto.stock;
    }
}

module.exports = Producto;