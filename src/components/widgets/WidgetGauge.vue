<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  widget: any
  datos: { sensorId: string, valores: { x: string, y: number }[] }[]
}>()

const sensor = props.datos[0]
const valores = sensor?.valores || []

const valorActual = computed(() => {
  return valores.length ? valores[valores.length - 1].y : 0
})

const sensorNombre = props.widget.sensores[0]?.nombre || 'Sensor'
const unidad = props.widget.sensores[0]?.unidad || ''

// Configuración del gauge
const minValue = props.widget.sensores[0]?.min || 0
const maxValue = props.widget.sensores[0]?.max || 100
const valorAnimado = ref(0)

// Calcular porcentaje y ángulo
const porcentaje = computed(() => {
  if (typeof valorActual.value !== 'number' || valorActual.value === 0) return 0
  return Math.min(Math.max((valorActual.value - minValue) / (maxValue - minValue) * 100, 0), 100)
})

const angulo = computed(() => {
  return (porcentaje.value / 100) * 270 - 135 // 270° de arco, comenzando en -135°
})

// Colores dinámicos basados en el valor
const colorGauge = computed(() => {
  const p = porcentaje.value
  if (p < 30) return { primary: '#10B981', secondary: '#10B98120', text: '#059669' } // Verde
  if (p < 60) return { primary: '#F59E0B', secondary: '#F59E0B20', text: '#D97706' } // Amarillo
  if (p < 80) return { primary: '#F97316', secondary: '#F9731620', text: '#EA580C' } // Naranja
  return { primary: '#EF4444', secondary: '#EF444420', text: '#DC2626' } // Rojo
})

// Tendencia del valor
const tendencia = computed(() => {
  if (valores.length < 2) return 'neutral'
  const actual = valores[valores.length - 1].y
  const anterior = valores[valores.length - 2].y
  if (actual > anterior) return 'up'
  if (actual < anterior) return 'down'
  return 'neutral'
})

// Animación del valor
const animarValor = () => {
  const inicio = valorAnimado.value
  const fin = typeof valorActual.value === 'number' ? valorActual.value : 0
  const duracion = 1000
  const inicioTiempo = Date.now()

  const animar = () => {
    const tiempoTranscurrido = Date.now() - inicioTiempo
    const progreso = Math.min(tiempoTranscurrido / duracion, 1)
    
    // Easing function (ease-out-cubic)
    const easedProgress = 1 - Math.pow(1 - progreso, 3)
    
    valorAnimado.value = inicio + (fin - inicio) * easedProgress
    
    if (progreso < 1) {
      requestAnimationFrame(animar)
    }
  }
  
  requestAnimationFrame(animar)
}

onMounted(() => {
  animarValor()
})

watch(valorActual, () => {
  animarValor()
})

// Formatear valor para mostrar
const valorFormateado = computed(() => {
  if (typeof valorAnimado.value !== 'number') return '--'
  if (valorAnimado.value >= 1000000) {
    return (valorAnimado.value / 1000000).toFixed(1) + 'M'
  } else if (valorAnimado.value >= 1000) {
    return (valorAnimado.value / 1000).toFixed(1) + 'K'
  }
  return valorAnimado.value.toFixed(1)
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 w-full h-full">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ sensorNombre }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Valor actual del sensor
          </p>
        </div>
        
        <!-- Indicador de tendencia -->
        <div class="flex items-center space-x-2">
          <div 
            v-if="tendencia === 'up'" 
            class="flex items-center text-green-600 dark:text-green-400"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-xs font-medium">Subiendo</span>
          </div>
          <div 
            v-else-if="tendencia === 'down'" 
            class="flex items-center text-red-600 dark:text-red-400"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-xs font-medium">Bajando</span>
          </div>
          <div 
            v-else 
            class="flex items-center text-gray-500 dark:text-gray-400"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="text-xs font-medium">Estable</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gauge Chart -->
    <div class="flex items-center justify-center flex-1">
      <div class="relative">
        <!-- SVG Gauge -->
        <svg width="280" height="200" viewBox="0 0 280 200" class="drop-shadow-sm">
          <!-- Fondo del arco -->
          <path
            d="M 40 160 A 100 100 0 0 1 240 160"
            fill="none"
            :stroke="colorGauge.secondary"
            stroke-width="20"
            stroke-linecap="round"
            class="transition-all duration-500"
          />
          
          <!-- Arco de progreso -->
          <path
            d="M 40 160 A 100 100 0 0 1 240 160"
            fill="none"
            :stroke="colorGauge.primary"
            stroke-width="20"
            stroke-linecap="round"
            :stroke-dasharray="`${(porcentaje / 100) * 314} 314`"
            stroke-dashoffset="0"
            class="transition-all duration-1000 ease-out"
            :style="{ filter: `drop-shadow(0 0 8px ${colorGauge.primary}40)` }"
          />
          
          <!-- Marcadores -->
          <g class="text-xs fill-gray-400 dark:fill-gray-500">
            <text x="40" y="175" text-anchor="middle">{{ minValue }}</text>
            <text x="140" y="65" text-anchor="middle">{{ Math.round((maxValue + minValue) / 2) }}</text>
            <text x="240" y="175" text-anchor="middle">{{ maxValue }}</text>
          </g>
          
          <!-- Aguja indicadora -->
          <g class="transition-transform duration-1000 ease-out" :style="{ transformOrigin: '140px 160px', transform: `rotate(${angulo}deg)` }">
            <line
              x1="140" y1="160"
              x2="140" y2="80"
              :stroke="colorGauge.primary"
              stroke-width="3"
              stroke-linecap="round"
            />
            <circle
              cx="140" cy="160"
              r="8"
              :fill="colorGauge.primary"
              class="drop-shadow-md"
            />
            <circle
              cx="140" cy="160"
              r="4"
              fill="white"
            />
          </g>
        </svg>

        <!-- Valor central -->
        <div class="absolute inset-0 flex items-center justify-center mt-8">
          <div class="text-center">
            <div 
              class="text-5xl font-bold transition-colors duration-500"
              :style="{ color: colorGauge.text }"
            >
              {{ valorFormateado }}
            </div>
            <div class="text-lg font-medium text-gray-600 dark:text-gray-300 mt-1">
              {{ unidad }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {{ porcentaje.toFixed(1) }}% del rango
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Mínimo</div>
          <div class="font-semibold text-gray-900 dark:text-white">{{ minValue }} {{ unidad }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Actual</div>
          <div class="font-semibold text-gray-900 dark:text-white">
            {{ valores.length ? valorActual : '--' }} {{ unidad }}
          </div>
        </div>
        <div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Máximo</div>
          <div class="font-semibold text-gray-900 dark:text-white">{{ maxValue }} {{ unidad }}</div>
        </div>
      </div>
    </div>
  </div>
</template>