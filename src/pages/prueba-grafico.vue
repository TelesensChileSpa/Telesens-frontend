<script setup lang="ts">
import RealtimeChart from '~/components/RealtimeChart.vue'

// Usa valores reales desde el backend
const dispositivoId = '67db472923c111caca57aff9'
const variable = 'dg9o4blo8XmYfHCD8UVc'
const unidad = '°C'
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Gráfico en Tiempo Real</h1>
    
    <RealtimeChart
      :dispositivoId="dispositivoId"
      :variable="variable"
      :unidad="unidad"
    />
  </div>
</template>