import { ref } from 'vue'
import type { Widget } from '~/types/widget'
import type { DataSensor } from '~/types/dataSensor'

/**
 * useWidgetData
 * Provee métodos para obtener y transformar datos para un widget.
 */
export function useWidgetData() {
  // Estado reactivo para los datos (opcional si lo quieres fuera)
  const datos = ref<DataSensor[]>([])

  /**
   * Obtiene los datos de telemetría de los sensores vinculados a un widget
   * Aquí simulo una llamada a la API con fetch / useFetch
   * @param widget Widget con sensores
   * @param desde Fecha ISO string para filtrar datos recientes (default: última hora)
   */
  async function obtenerDatos(widget: Widget, desde?: string): Promise<DataSensor[]> {
    if (!desde) {
      const unaHoraAntes = new Date(Date.now() - 60 * 60 * 1000)
      desde = unaHoraAntes.toISOString()
    }

    // Construye query para sensores
    const sensorIds = widget.sensores.map(s => s.id).join(',')

    try {
      // Usamos useFetch de Nuxt 3 o fetch normal
      const { data, error } = await useFetch<DataSensor[]>('/api/mediciones', {
        method: 'GET',
        params: {
          sensorIds,
          desde
        }
      })

      if (error.value) {
        console.error('Error al obtener datos:', error.value)
        return []
      }

      // Asumo que la API devuelve:
      // [{ sensorId: string, valores: { x: string, y: number }[] }, ...]
      datos.value = data.value || []
      return datos.value
    } catch (e) {
      console.error('Error inesperado al obtener datos:', e)
      return []
    }
  }

  return {
    datos,
    obtenerDatos
  }
}
