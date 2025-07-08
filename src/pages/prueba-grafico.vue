<script setup lang="ts">
import RealtimeChart from '~/components/RealtimeChart.vue'

// Parámetros fijos directamente en el código
const plantaCodigo = '1ff85932-8dca-4b09-9c57-92eb06549d18'
const variableCodigo = 'DfVwj3bkYmHHANY1SYjm'
const unidad = '°C'
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Gráfico en Tiempo Real</h1>

    <RealtimeChart
      :plantaCodigo="plantaCodigo"
      :variable="variableCodigo"
      :unidad="unidad"
    />
  </div>
</template>