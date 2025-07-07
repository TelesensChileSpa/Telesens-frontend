<script setup lang="ts">
import { watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  TimeScale,
} from 'chart.js'
import type {
  ChartData,
  ChartOptions,
  ChartDataset,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { useRealtimeChart } from '~/composables/useRealtimeChart'
import { computed } from 'vue'

// Registrar componentes
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  TimeScale
)

const props = defineProps<{
  dispositivoId: string
  variable: string
  unidad: string
}>()

const { chartData } = useRealtimeChart(props.dispositivoId, props.variable)

// Definimos el tipo para los datos con x numérico (timestamp)
type DataPoint = { x: number; y: number }

// Computed con tipo ChartData y dataset con DataPoint[]
const chart = computed<ChartData<'line', DataPoint[], unknown>>(() => ({
  datasets: [
    {
      label: props.variable,
      data: chartData.value.map(p => ({
        x: new Date(p.x).getTime(),  // convierte ISO string a timestamp numérico
        y: p.y,
      })),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#06b6d4',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
    }
  ],
}))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  layout: {
    padding: {
      top: 10,
      right: 20,
      bottom: 10,
      left: 20,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'start',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 13,
          weight: 'bold',
        },
        color: '#374151',
        padding: 15,
        boxWidth: 12,
        boxHeight: 12,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#06b6d4',
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: false,
      titleFont: {
        size: 13,
        weight: 'bold',
      },
      bodyFont: {
        size: 12,
      },
      padding: 10,
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'dd-MM-yyyy HH:mm:ss',
        displayFormats: {
          minute: 'HH:mm',
          hour: 'HH:mm',
        },
      },
      title: {
        display: true,
        text: 'Tiempo',
        font: {
          size: 12,
          weight: 'bold',
        },
        color: '#374151',
        padding: { top: 8 },
      },
      grid: {
        color: 'rgba(156, 163, 175, 0.15)',
        lineWidth: 1,
        drawTicks: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 11,
        },
        padding: 8,
        maxTicksLimit: 8,
      },
      border: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: props.unidad,
        font: {
          size: 12,
          weight: 'bold',
        },
        color: '#374151',
        padding: { bottom: 8 },
      },
      suggestedMin: -30,
      suggestedMax: 30,
      grid: {
        color: 'rgba(156, 163, 175, 0.15)',
        lineWidth: 1,
        drawTicks: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 11,
        },
        padding: 8,
        maxTicksLimit: 8,
      },
      border: {
        display: false,
      },
    },
  },
}

watch(chartData, (newVal) => {
  console.log('Datos recibidos para gráfico:', newVal)
})
</script>

<template>
  <div class="relative bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-zinc-700/50 w-full h-[400px] md:h-[600px] backdrop-blur-sm">
    <!-- Header con indicador de estado -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-3">
        <div class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/30"></div>
        <h3 class="text-base font-semibold text-gray-800 dark:text-white">
          {{ variable }}
        </h3>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">
        En tiempo real
      </div>
    </div>
    
    <!-- Contenedor del gráfico -->
    <div class="relative h-[calc(100%-3rem)] rounded-2xl overflow-hidden">
      <Line :data="chart" :options="chartOptions" />
      
      <!-- Overlay sutil para efecto de profundidad -->
      <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-black/5"></div>
    </div>
    
    <!-- Decoración sutil -->
    <div class="absolute top-3 right-3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
    <div class="absolute bottom-3 left-3 w-1 h-1 bg-cyan-400 rounded-full opacity-20"></div>
  </div>
</template>