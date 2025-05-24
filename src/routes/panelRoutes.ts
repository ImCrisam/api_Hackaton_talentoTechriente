// panelRoutes.ts
import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const filePath = path.join(__dirname, '../utils/panelInfo.json')

router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo archivo' })
    const parsed = JSON.parse(data)
    res.json(parsed.panel)
  })
})

router.post('/', (req, res) => {
  const formData = req.body

  try {
    const panelRaw = fs.readFileSync(filePath, 'utf8')
    const panelData = JSON.parse(panelRaw)

    // Mapear nuevos valores en `panelData.panel.campos`
    panelData.panel.campos.forEach((campo) => {
      if (campo.tipo === 'lista' && Array.isArray(campo.campos)) {
        campo.campos.forEach((subcampo) => {
          const nuevoValor = formData?.[campo.nombre]?.[subcampo.nombre]
          if (nuevoValor !== undefined) subcampo.valor = nuevoValor
        })
      } else {
        const nuevoValor = formData?.[campo.nombre]
        if (nuevoValor !== undefined) campo.valor = nuevoValor
      }
    })

    fs.writeFileSync(filePath, JSON.stringify(panelData, null, 2), 'utf8')
    res.json({ ok: true, message: 'Datos guardados' })
  } catch (error) {
    res.status(500).json({ error: 'Error guardando datos' })
  }
})

export default router
