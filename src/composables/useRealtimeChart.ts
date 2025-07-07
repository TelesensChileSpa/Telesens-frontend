import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useSocket } from './useSocket'

interface DataPoint {
  x: string  // ISO string de fecha, ej: "2025-07-07T06:53:00.000Z"
  y: number
}

export function useRealtimeChart(plantaCodigo: string, variableCodigo: string) {
  const chartData = ref<DataPoint[]>([])
  const maxPoints = 30
  const { socket } = useSocket()

  const handler = (data: any) => {
    console.log('Dato recibido en handler:', data)

    //if (data.plantaCodigo === plantaCodigo && data.variableCodigo === variableCodigo) {
      const punto: DataPoint = {
        x: data.creado,
        y: parseFloat(data.value),
      }
      chartData.value.push(punto)
      if (chartData.value.length > maxPoints) {
        chartData.value.shift()
      }
      console.log('📈 Dato agregado al gráfico:', punto)
    //} else {
      //console.log('Dato filtrado (no coincide planta o variable):', data)
    //}
  }

  const subscribe = () => {
    console.log('🔌 Suscrito a new-data')
    socket.value?.on('new-data', handler)
  }

  const unsubscribe = () => {
    if (!socket.value) return
    socket.value.off('new-data', handler)
    console.log('❌ Desuscrito de new-data')
  }

  onMounted(() => {
    // Si ya está conectado, suscribirse
    if (socket.value?.connected) {
      subscribe()
    }

    // Observar cambios en el socket para conectar cuando esté listo
    watch(
      socket,
      (newSocket, oldSocket, onCleanup) => {
        if (oldSocket) {
          oldSocket.off('new-data', handler)
          console.log('❌ Desuscrito del socket antiguo')
        }
        if (newSocket?.connected) {
          subscribe()
        }
        onCleanup(() => {
          unsubscribe()
        })
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return { chartData }
}