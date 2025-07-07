<script setup lang="ts">
import { useRoute } from 'vue-router'
import RealtimeChart from '~/components/RealtimeChart.vue'

// Obtener los parámetros desde la URL
const route = useRoute()

// Extraer parámetros de query
const plantaCodigo = route.query.plantaCodigo as string || ''
const variableCodigo = route.query.variableCodigo as string || ''
const unidad = route.query.unidad as string || '°C'
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Gráfico en Tiempo Real</h1>

    <div v-if="plantaCodigo && variableCodigo">
      <RealtimeChart
        :plantaCodigo="plantaCodigo"
        :variable="variableCodigo"
        :unidad="unidad"
      />
    </div>
    <div v-else class="text-red-600 font-semibold">
      Parámetros inválidos: asegúrate de pasar <code>?plantaCodigo=...&variableCodigo=...&unidad=...</code>
    </div>
  </div>
</template>