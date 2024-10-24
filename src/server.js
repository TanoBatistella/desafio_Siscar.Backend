import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/producto.routes.js';
import { connectDB } from './config/db.config.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
