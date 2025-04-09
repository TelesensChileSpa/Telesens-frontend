<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { isDarkMode, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme"
    class="absolute top-4 right-4 p-3 bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none">
    <span v-if="isDarkMode">
      <Moon class="w-5 h-5" />
    </span>
    <span v-else>
      <Sun class="w-5 h-5" />
    </span>
  </button>
</template>
