import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useSocket } from './useSocket'

interface DataPoint {
  x: number
  y: number
}

export function useRealtimeChart(plantaCodigo: string, variableCodigo: string) {
  const chartData = ref<DataPoint[]>([])
  const maxPoints = 30
  const { socket } = useSocket()

  const handler = (data: any) => {
    console.log('Dato recibido en handler:', data)
    console.log('Esperado:', plantaCodigo, variableCodigo)

    //if (data.plantaCodigo === plantaCodigo && data.variableCodigo === variableCodigo) {
      const punto: DataPoint = {
        x: new Date(data.creado).getTime(),
        y: parseFloat(data.value),
      }
      chartData.value.push(punto)
      if (chartData.value.length > 30) {
        chartData.value.shift()
      }
      console.log('📈 Dato agregado al gráfico:', punto)
    //} else {
      //console.log('❌ Dato ignorado')
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