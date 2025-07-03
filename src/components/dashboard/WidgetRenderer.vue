<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { widgetComponents } from '~/components/widgets'
import { useWidgetData } from '~/composables/useWidgetData'
import type { Widget } from '~/types/widget'
import type { DataSensor } from '~/types/dataSensor'

const props = defineProps<{
  widget: Widget
}>()
const { widget } = props

const datos = ref<DataSensor[]>([])

onMounted(async () => {
  // ⚠️ Solo para demo
  if (import.meta.dev) {
    datos.value = [
      {
        sensorId: widget.sensores[0].id,
        valores: [
          { x: '10:00', y: 12 },
          { x: '10:30', y: 13 },
          { x: '11:00', y: 14 },
          { x: '11:30', y: 16 }
        ]
      }
    ]
  } else {
    datos.value = await obtenerDatos(widget)
  }
})

const { obtenerDatos } = useWidgetData()

onMounted(async () => {
  datos.value = await obtenerDatos(props.widget)
})

const widgetComponent = computed(() => {
  return widgetComponents[props.widget.plantilla] || widgetComponents['tarjeta']
})
</script>

<template>
  <component
    :is="widgetComponent"
    :widget="widget"
    :datos="datos"
  />
</template>