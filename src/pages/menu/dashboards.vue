<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Line, Bar } from 'vue-chartjs';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const lineChartData = ref({
  labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  datasets: [
    {
      label: 'Temperatura (°C)',
      data: [18, 18.4, 18.7, 19.1, 18.8, 18.5],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.3)',
      fill: true,
      tension: 0.4,
    },
  ],
});

const barChartData = ref({
  labels: ['Sensor A', 'Sensor B', 'Sensor C'],
  datasets: [
    {
      label: 'Humedad (%)',
      data: [60, 72, 55],
      backgroundColor: ['#60A5FA', '#3B82F6', '#2563EB'],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">
      Dashboard IoT - Resumen de Sensores
    </h1>

    <!-- Tarjetas de resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div class="bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded-xl shadow">
        <div class="text-sm">Temperatura</div>
        <div class="text-2xl font-bold">18.7°C</div>
      </div>
      <div class="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-xl shadow">
        <div class="text-sm">Humedad</div>
        <div class="text-2xl font-bold">65%</div>
      </div>
      <div class="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-xl shadow">
        <div class="text-sm">CO₂</div>
        <div class="text-2xl font-bold">410 ppm</div>
      </div>
      <div class="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-4 rounded-xl shadow">
        <div class="text-sm">Presión</div>
        <div class="text-2xl font-bold">1012 hPa</div>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Temperatura - Últimas Horas</h2>
        <Line :data="lineChartData" :options="chartOptions" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Humedad por Sensor</h2>
        <Bar :data="barChartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
