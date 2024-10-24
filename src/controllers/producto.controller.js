import sql from 'mssql';
import dbConfig from '../config/db.config.js';

let poolConnection;

const getConnection = async () => {
    if (!poolConnection) {
        poolConnection = await sql.connect(dbConfig);
    }
    return poolConnection;
};

const controller = {
    getAll: async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query('SELECT Id as id, Name as name, Description as description, Price as price, Stock as stock FROM Products ORDER BY Id DESC');
            res.json(result.recordset);
        } catch (error) {
            console.error('Error en getAll:', error);
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT Id as id, Name as name, Description as description, Price as price, Stock as stock FROM Products WHERE Id = @id');

            if (result.recordset.length > 0) {
                res.json(result.recordset[0]);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error en getById:', error);
            res.status(500).json({ message: 'Error al obtener producto', error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name, description, price, stock } = req.body;
            const pool = await getConnection();
            const result = await pool.request()
                .input('name', sql.VarChar(100), name)
                .input('description', sql.Text, description)
                .input('price', sql.Decimal(10,2), price)
                .input('stock', sql.Int, stock)
                .query(`
                    INSERT INTO Products (Name, Description, Price, Stock)
                    OUTPUT 
                        INSERTED.Id as id,
                        INSERTED.Name as name,
                        INSERTED.Description as description,
                        INSERTED.Price as price,
                        INSERTED.Stock as stock
                    VALUES (@name, @description, @price, @stock)
                `);
    
            res.status(201).json(result.recordset[0]);
        } catch (error) {
            console.error('Error en create:', error);
            res.status(500).json({ message: 'Error al crear producto', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock } = req.body; 
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('name', sql.VarChar(100), name)
                .input('description', sql.Text, description)
                .input('price', sql.Decimal(10,2), price)
                .input('stock', sql.Int, stock)
                .query(`
                    UPDATE Products
                    SET Name = @name,
                        Description = @description,
                        Price = @price,
                        Stock = @stock
                    OUTPUT 
                        INSERTED.Id as id,
                        INSERTED.Name as name,
                        INSERTED.Description as description,
                        INSERTED.Price as price,
                        INSERTED.Stock as stock
                    WHERE Id = @id
                `);

            if (result.recordset.length > 0) {
                res.json(result.recordset[0]);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error en update:', error);
            res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Products WHERE Id = @id');

            if (result.rowsAffected[0] > 0) {
                res.json({ message: 'Producto eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error en delete:', error);
            res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
        }
    }
};

export default controller;
