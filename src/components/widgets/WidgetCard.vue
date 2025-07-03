<script setup lang="ts">
const props = defineProps<{
  widget: any
  datos: { sensorId: string, valores: { x: string, y: number }[] }[]
}>()

const sensor = props.datos[0]
const valores = sensor?.valores || []

const valorActual = computed(() => {
  return valores.length ? valores[valores.length - 1].y : '--'
})

const valorAnterior = computed(() => {
  return valores.length >= 2 ? valores[valores.length - 2].y : null
})

const tendencia = computed(() => {
  if (!valorAnterior.value || valorActual.value === '--') return null
  const actual = Number(valorActual.value)
  const anterior = Number(valorAnterior.value)
  return actual > anterior ? 'up' : actual < anterior ? 'down' : 'stable'
})

const porcentajeCambio = computed(() => {
  if (!valorAnterior.value || valorActual.value === '--') return null
  const actual = Number(valorActual.value)
  const anterior = Number(valorAnterior.value)
  const cambio = ((actual - anterior) / anterior) * 100
  return Math.abs(cambio).toFixed(1)
})

const sensorNombre = props.widget.sensores[0]?.nombre || 'Sensor'
const unidad = props.widget.sensores[0]?.unidad || ''

// Color dinámico basado en el tipo de sensor
const colorConfig = computed(() => {
  const nombre = sensorNombre.toLowerCase()
  if (nombre.includes('temperatura') || nombre.includes('temp')) {
    return {
      gradient: 'from-orange-400 to-red-500',
      bg: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      icon: '🌡️',
      accent: 'text-orange-600 dark:text-orange-400'
    }
  } else if (nombre.includes('humedad')) {
    return {
      gradient: 'from-blue-400 to-cyan-500',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      icon: '💧',
      accent: 'text-blue-600 dark:text-blue-400'
    }
  } else if (nombre.includes('presion')) {
    return {
      gradient: 'from-purple-400 to-indigo-500',
      bg: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20',
      icon: '📊',
      accent: 'text-purple-600 dark:text-purple-400'
    }
  } else {
    return {
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
      icon: '📈',
      accent: 'text-emerald-600 dark:text-emerald-400'
    }
  }
})
</script>

<template>
  <div class="group relative w-full h-full min-h-[160px] sm:min-h-[180px]">
    <!-- Fondo con glassmorphism y hover effect -->
    <div 
      class="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
      :class="colorConfig.bg"
    />
    
    <!-- Border gradient animado -->
    <div class="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         :class="colorConfig.gradient">
      <div class="w-full h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" />
    </div>
    
    <!-- Contenido principal -->
    <div class="relative h-full flex flex-col justify-between p-4 sm:p-6 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-lg">
      
      <!-- Header con icono y nombre -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl">{{ colorConfig.icon }}</span>
          <h3 class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
            {{ sensorNombre }}
          </h3>
        </div>
        
        <!-- Indicador de estado -->
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">Live</span>
        </div>
      </div>

      <!-- Valor principal -->
      <div class="flex-1 flex flex-col justify-center items-center text-center">
        <div class="flex items-baseline justify-center gap-1 mb-2">
          <span 
            class="text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-500 group-hover:scale-105"
            :class="colorConfig.accent"
          >
            {{ valorActual }}
          </span>
          <span 
            v-if="unidad && valorActual !== '--'" 
            class="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400"
          >
            {{ unidad }}
          </span>
        </div>

        <!-- Indicador de tendencia -->
        <div v-if="tendencia && porcentajeCambio" class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
             :class="{
               'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': tendencia === 'up',
               'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': tendencia === 'down',
               'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400': tendencia === 'stable'
             }">
          <span v-if="tendencia === 'up'">↗️</span>
          <span v-else-if="tendencia === 'down'">↘️</span>
          <span v-else>➡️</span>
          <span>{{ porcentajeCambio }}%</span>
        </div>
      </div>

      <!-- Footer con timestamp -->
      <div class="flex justify-between items-center pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          Actualizado
        </span>
        <span class="text-xs text-gray-400 dark:text-gray-500">
          {{ new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) }}
        </span>
      </div>
    </div>

    <!-- Efecto de brillo en hover -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </div>
</template>