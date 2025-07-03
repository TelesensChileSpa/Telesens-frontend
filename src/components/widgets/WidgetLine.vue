<script setup lang="ts">
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  LineElement, 
  PointElement, 
  LinearScale, 
  Title, 
  CategoryScale, 
  Tooltip, 
  Legend,
  Filler
)

const props = defineProps<{
  widget: any
  datos: { sensorId: string, valores: { x: string, y: number }[] }[]
}>()

// Paleta de colores moderna y atractiva
const colorPalette = [
  { border: '#3B82F6', bg: '#3B82F6', bgAlpha: '#3B82F620' }, // Azul
  { border: '#10B981', bg: '#10B981', bgAlpha: '#10B98120' }, // Verde
  { border: '#F59E0B', bg: '#F59E0B', bgAlpha: '#F59E0B20' }, // Naranja
  { border: '#EF4444', bg: '#EF4444', bgAlpha: '#EF444420' }, // Rojo
  { border: '#8B5CF6', bg: '#8B5CF6', bgAlpha: '#8B5CF620' }, // Púrpura
  { border: '#06B6D4', bg: '#06B6D4', bgAlpha: '#06B6D420' }, // Cian
  { border: '#F97316', bg: '#F97316', bgAlpha: '#F9731620' }, // Naranja oscuro
  { border: '#84CC16', bg: '#84CC16', bgAlpha: '#84CC1620' }  // Lima
]

const chartData = computed(() => {
  return {
    labels: props.datos[0]?.valores.map(v => v.x) || [],
    datasets: props.datos.map((sensor, i) => {
      const colors = colorPalette[i % colorPalette.length]
      return {
        label: props.widget.sensores[i]?.nombre || `Sensor ${i + 1}`,
        data: sensor.valores.map(v => v.y),
        borderColor: colors.border,
        backgroundColor: colors.bgAlpha,
        pointBackgroundColor: colors.bg,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 3,
        tension: 0.4,
        fill: false, // Cambia a true si quieres área rellena
        pointHoverBackgroundColor: colors.bg,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3
      }
    })
  }
})

const chartOptions = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          color: isDark ? '#E5E7EB' : '#374151',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        titleColor: isDark ? '#F9FAFB' : '#111827',
        bodyColor: isDark ? '#E5E7EB' : '#374151',
        borderColor: isDark ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: isDark ? '#374151' : '#F3F4F6',
          drawBorder: false
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          font: {
            size: 11
          },
          maxTicksLimit: 8
        },
        border: {
          display: false
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: isDark ? '#374151' : '#F3F4F6',
          drawBorder: false
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          font: {
            size: 11
          },
          callback: function(value: any) {
            // Formatear números grandes
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K'
            }
            return value
          }
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 8
      },
      line: {
        borderCapStyle: 'round' as const,
        borderJoinStyle: 'round' as const
      }
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart' as const
    }
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 w-full h-full">
    <!-- Header del widget -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ widget.titulo || 'Gráfico de Sensores' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Evolución temporal de los valores
      </p>
    </div>
    
    <!-- Gráfico -->
    <div class="relative h-80">
      <Line 
        :data="chartData" 
        :options="chartOptions"
      />
    </div>
    
    <!-- Información adicional -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span>
          <strong class="text-gray-700 dark:text-gray-300">Sensores:</strong> 
          {{ datos.length }}
        </span>
        <span v-if="datos[0]?.valores.length">
          <strong class="text-gray-700 dark:text-gray-300">Puntos:</strong> 
          {{ datos[0].valores.length }}
        </span>
        <span v-if="datos[0]?.valores.length">
          <strong class="text-gray-700 dark:text-gray-300">Último:</strong> 
          {{ datos[0].valores[datos[0].valores.length - 1]?.x }}
        </span>
      </div>
    </div>
  </div>
</template>