<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';

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
    <footer :class="isDarkMode ? 'bg-gray-900' : 'bg-[#f2f2f2]'" class="mt-auto">
      <div class="h-2 mt-2 bg-gradient-to-r from-[#66BB6A] via-[#4CAF50] to-[#2C6B2F]"></div>
      <section :class="isDarkMode ? 'text-white border-gray-700' : 'text-grayColor border-gray-200'"
        class="border-t-2 py-4 px-14 flex flex-col items-center text-center gap-2 lg:flex-row lg:justify-between">
        <h4 class="w-full text-center">Copyright © 2025 Telesens Chile Spa.</h4>
      </section>
    </footer>
  </div>
</template>
