import sql from 'mssql';

const dbConfig = {
    user: 'sa',        
    password: 'contra123',  
    server: 'localhost',        
    database: 'ProductosDB',     
    options: {
        encrypt: false,         
        trustServerCertificate: true 
    }
};

// Conectar a la base de datos
export const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
};

export default dbConfig;
