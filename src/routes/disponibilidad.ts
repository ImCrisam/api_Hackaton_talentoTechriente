import express, { Request, Response, Router } from "express"
import fs from "fs"
import path from "path"
import { Disponibilidad } from "../types/disponibilidad"

const router = Router()
const DATA_FILE = path.join(__dirname, "..", "data", "disponibilidad.json")

function leerDisponibilidad(): Disponibilidad {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8")
    return JSON.parse(data) as Disponibilidad
  } catch {
    return {
      salones: [
        {
          id: 1,
          nombre: "Salón 101",
          horarios: [
            { bloque: "Bloque 1", curso: "", profesor: "", rol: "" },
            { bloque: "Bloque 2", curso: "", profesor: "", rol: "" },
          ],
        },
      ],
    }
  }
}

router.get("/", (req: Request, res: Response) => {
  const disponibilidad = leerDisponibilidad()
  res.json(disponibilidad)
})

router.post("/", (req: any, res: any) => {
  const nuevaDisponibilidad = req.body as Disponibilidad
  if (!nuevaDisponibilidad.salones || !Array.isArray(nuevaDisponibilidad.salones)) {
    return res.status(400).json({ error: "Datos inválidos" })
  }
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(nuevaDisponibilidad, null, 2))
    res.json({ message: "Datos guardados correctamente" })
  } catch {
    res.status(500).json({ error: "Error al guardar datos" })
  }
})

export default router
