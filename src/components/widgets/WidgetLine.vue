<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WidgetLine from '~/components/widgets/WidgetLine.vue'
import type { Widget } from '~/types/widget'
import type { DataSensor } from '~/types/dataSensor'
import { io, type Socket } from 'socket.io-client'

// Datos reactivos reales (vacío al iniciar)
const datosTemperatura = ref<DataSensor[]>([])

// Define el widget, ajusta según tus sensores reales
const widgetTemperatura: Widget = {
  id: 'w1',
  nombre: 'Temperatura',
  titulo: 'Monitor de Temperatura',
  plantilla: 'linea',
  configuracion: {},
  sensores: [] // Lo puedes llenar dinámicamente si quieres
}

// WebSocket
let socket: Socket | null = null

function conectarSocket() {
  socket = io('http://localhost:3000/ws-auth', {
    transports: ['websocket'],
    // auth: { token } // si usas autenticación
  })

  socket.on('connect', () => {
    console.log('Socket conectado:', socket?.id)
  })

  socket.on('new-data', (data: any) => {
    // Esperamos data con estructura { dispositivoId, variable, fecha, value }
    if (!data?.dispositivoId || data.variable !== 'Temperatura' || data.value === undefined) return

    // Buscar si ya existe ese sensor en datosTemperatura
    const index = datosTemperatura.value.findIndex(d => d.sensorId === data.dispositivoId)

    if (index === -1) {
      // Nuevo sensor: agregamos con el primer dato
      datosTemperatura.value.push({
        sensorId: data.dispositivoId,
        valores: [{ x: data.fecha, y: data.value }]
      })
    } else {
      // Sensor existente: añadimos nuevo valor
      const sensorData = datosTemperatura.value[index]
      sensorData.valores.push({ x: data.fecha, y: data.value })

      // Opcional: limitar cantidad de datos para evitar overflow
      if (sensorData.valores.length > 100) sensorData.valores.shift()

      // Forzar actualización reactiva
      datosTemperatura.value[index] = { ...sensorData }
    }
  })

  socket.on('disconnect', () => {
    console.log('Socket desconectado')
  })
}

onMounted(() => {
  conectarSocket()
})

onBeforeUnmount(() => {
  socket?.disconnect()
})
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
    <h1 class="text-2xl font-bold mb-6">Datos Reales en Gráfico</h1>
    <WidgetLine :widget="widgetTemperatura" :datos="datosTemperatura" />
  </div>
</template>