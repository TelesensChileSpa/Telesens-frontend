<template>
    <div
      v-if="visible"
      :class="[notificationClass, isConnected ? 'bg-green-100' : 'bg-red-100']"
    >
      <p v-if="isConnected" class="text-green-600 font-medium">
        ¡Conectado correctamente!
      </p>
      <p v-else class="text-red-600 font-medium">
        No se pudo conectar al servidor. Verifique la conexión o intente más tarde.
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useSocket } from '~/composables/useSocket'
  
  const { isConnected } = useSocket()
  
  const visible = ref(false)
  
  const notificationClass = 'fixed top-20 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out'
  
  // Mostrar la notificación cada vez que cambia la conexión
  watch(isConnected, (newStatus) => {
    visible.value = true
  
    // Ocultar después de 4 segundos
    setTimeout(() => {
      visible.value = false
    }, 4000)
  })
  </script>
  
  <style scoped>
  .text-green-600 {
    color: #16a34a;
  }
  
  .text-red-600 {
    color: #dc2626;
  }
  </style>
  