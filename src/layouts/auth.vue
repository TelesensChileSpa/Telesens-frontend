<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';
import Footer from '~/components/Footer.vue';

const { isDarkMode, initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div :class="{ 'bg-gray-900': isDarkMode, 'bg-[#f2f2f2]': !isDarkMode }"
    class="flex flex-col justify-between w-screen h-screen">
    <!-- Contenido principal (login form o similar) -->
    <slot />

    <!-- Footer -->
    <Footer />
  </div>
</template>
