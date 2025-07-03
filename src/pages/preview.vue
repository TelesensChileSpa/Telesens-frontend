<script setup lang="ts">
import { ref, onMounted } from 'vue'
import WidgetLine from '~/components/widgets/WidgetLine.vue'
import WidgetGauge from '~/components/widgets/WidgetGauge.vue'
import WidgetCard from '~/components/widgets/WidgetCard.vue'
import type { Widget } from '~/types/widget'
import type { DataSensor } from '~/types/dataSensor'

// Datos de sensores más realistas
const sensores = [
  { id: 'temp1', nombre: 'Temperatura Ambiente', unidad: '°C', min: 15, max: 35 },
  { id: 'hum1', nombre: 'Humedad Relativa', unidad: '%', min: 30, max: 80 },
  { id: 'co2', nombre: 'CO₂', unidad: 'ppm', min: 400, max: 1000 },
  { id: 'lux', nombre: 'Luminosidad', unidad: 'lux', min: 0, max: 2000 }
]

// Generar datos de tiempo realistas (últimas 24 horas)
const generarDatos = (sensorId: string, valorBase: number, variacion: number) => {
  const datos = []
  const ahora = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const tiempo = new Date(ahora.getTime() - i * 60 * 60 * 1000)
    const ruido = (Math.random() - 0.5) * variacion
    const tendencia = Math.sin((23 - i) * 0.3) * (variacion * 0.3)
    const valor = Math.max(0, valorBase + tendencia + ruido)
    
    datos.push({
      x: tiempo.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      y: Math.round(valor * 10) / 10
    })
  }
  
  return {
    sensorId,
    valores: datos
  }
}

// Datos para cada tipo de widget
const datosTemperatura: DataSensor[] = [
  generarDatos('temp1', 22, 4),
  generarDatos('temp2', 24, 3)
]

const datosHumedad: DataSensor[] = [
  generarDatos('hum1', 55, 15)
]

const datosCO2: DataSensor[] = [
  generarDatos('co2', 650, 150)
]

const datosLuminosidad: DataSensor[] = [
  generarDatos('lux', 800, 600)
]

// Widgets configurados
const widgetTemperatura: Widget = {
  id: 'w1',
  nombre: 'Temperatura',
  titulo: 'Monitor de Temperatura',
  plantilla: 'linea',
  configuracion: {},
  sensores: [
    { ...sensores[0], nombre: 'Sensor Principal' },
    { ...sensores[0], id: 'temp2', nombre: 'Sensor Secundario' }
  ]
}

const widgetHumedad: Widget = {
  id: 'w2',
  nombre: 'Humedad',
  titulo: 'Humedad Relativa',
  plantilla: 'gauge',
  configuracion: {},
  sensores: [sensores[1]]
}

const widgetCO2: Widget = {
  id: 'w3',
  nombre: 'CO₂',
  titulo: 'Calidad del Aire',
  plantilla: 'gauge',
  configuracion: {},
  sensores: [sensores[2]]
}

const widgetLuminosidad: Widget = {
  id: 'w4',
  nombre: 'Luminosidad',
  titulo: 'Nivel de Luz',
  plantilla: 'card',
  configuracion: {},
  sensores: [sensores[3]]
}

// Sistema de actualización en tiempo real
const actualizando = ref(false)

const actualizarDatos = () => {
  actualizando.value = true
  
  // Simular actualización de datos
  setTimeout(() => {
    // Aquí actualizarías los datos reales
    actualizando.value = false
  }, 1000)
}

// Auto-actualización cada 30 segundos
onMounted(() => {
  const intervalo = setInterval(actualizarDatos, 30000)
  
  // Cleanup
  return () => clearInterval(intervalo)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-8">

      <!-- Widgets principales -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Widget de línea - Temperatura (span mayor) -->
        <div class="lg:col-span-8">
          <WidgetLine :widget="widgetTemperatura" :datos="datosTemperatura" />
        </div>
        
        <!-- Widget gauge - Humedad -->
        <div class="lg:col-span-4">
          <WidgetGauge :widget="widgetHumedad" :datos="datosHumedad" />
        </div>
        
        <!-- Widget gauge - CO2 -->
        <div class="lg:col-span-4">
          <WidgetGauge :widget="widgetCO2" :datos="datosCO2" />
        </div>
        
        <!-- Widget card - Luminosidad -->
        <div class="lg:col-span-4">
          <WidgetCard :widget="widgetLuminosidad" :datos="datosLuminosidad" />
        </div>
        
        <!-- Widget adicional - Temperatura como gauge -->
        <div class="lg:col-span-4">
          <WidgetGauge :widget="{ ...widgetTemperatura, titulo: 'Temperatura Actual' }" :datos="[datosTemperatura[0]]" />
        </div>
      </div>
    </div>
  </div>
</template>