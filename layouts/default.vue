<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

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
    <Footer />
  </div>
</template>
