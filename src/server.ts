// index.ts

import express, { Request, Response } from 'express';
import panelRoutes from './routes/panelRoutes';
import chatbotRouter from './routes/chatbotRouter';
import disponibilidad from './routes/disponibilidad';
import cors from 'cors'
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
app.use(cors())
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/panel-info', panelRoutes);
app.use('/api/chat', chatbotRouter);
app.use('/api/disponibilidad', disponibilidad);

// Ruta base de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express con TypeScript funcionando');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
