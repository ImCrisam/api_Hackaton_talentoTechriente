export type Horario = {
  bloque?: string
  curso?: string
  profesor?: string
  rol?: string
  [key: string]: any
}

export type Salon = {
  id?: number
  nombre?: string
  horarios?: Horario[]
  [key: string]: any
}

export type Disponibilidad = {
  salones?: Salon[]
  [key: string]: any
}
