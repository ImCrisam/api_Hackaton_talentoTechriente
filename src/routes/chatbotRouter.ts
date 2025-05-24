import express from 'express';
import { preguntarOpenAI } from '../IA/apiExternal';

const router = express.Router();

async function manejarPregunta(mensaje: string, res: any) {
  if (!mensaje) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }

  try {
    const respuesta = await preguntarOpenAI(
      mensaje,
      process.env.OPENAI_API_KEY || ''
    );
    res.json({ respuesta });
  } catch (error) {
    console.error('Error en geminis:', error);
    res.status(500).json({ error: 'Error al comunicarse con OpenAI' });
  }
}

// Ruta POST
router.post('/', async (req: any, res: any) => {
  const { mensaje } = req.body;
  await manejarPregunta(mensaje, res);
});

// Ruta GET
router.get('/', async (req: any, res: any) => {
  const mensaje = req.query.mensaje;
  await manejarPregunta(mensaje, res);
});



export default router;

