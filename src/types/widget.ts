export interface Sensor {
  id: string
  nombre: string
  unidad: string
}

export interface Widget {
  id: string
  nombre: string
  titulo: string
  plantilla: 'linea' | 'gauge' | 'tarjeta' | string
  configuracion: Record<string, any>
  sensores: Sensor[]
}
