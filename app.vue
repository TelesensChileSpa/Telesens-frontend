<script setup lang="ts">
import { useSocket } from '~/composables/useSocket'

// Ejecuta el socket al cargar la app
useSocket()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
