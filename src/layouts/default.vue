<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300 bg-[#f2f2f2] text-gray-900 dark:bg-gray-900 dark:text-white">

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
