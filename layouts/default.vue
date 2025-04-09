<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';
import Navbar from '~/components/Navbar.vue';

const { isDarkMode, initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div :class="{ 'bg-gray-900 text-white': isDarkMode, 'bg-[#f2f2f2] text-gray-900': !isDarkMode }"
    class="min-h-screen flex flex-col transition-colors duration-300">

    <!-- Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <main class="flex-1 px-4 py-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-auto">
      <div class="h-2 mt-2 bg-gradient-to-r from-[#66BB6A] via-[#4CAF50] to-[#2C6B2F]" />
      <section :class="[
        isDarkMode ? 'text-white border-gray-700' : 'text-grayColor border-gray-200'
      ]" class="border-t-2 py-4 px-6 text-center">
        <h4>Copyright © 2025 Telesens Chile Spa.</h4>
      </section>
    </footer>
  </div>
</template>
