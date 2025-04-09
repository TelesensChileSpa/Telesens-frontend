<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';

const { isDarkMode, initTheme } = useTheme();

onMounted(() => {
    initTheme();
});
</script>

<template>
    <!-- Este layout se centrará únicamente en el footer y sus estilos -->
    <div :class="{ 'bg-gray-900': isDarkMode, 'bg-[#f2f2f2]': !isDarkMode }" class="w-screen">
        <!-- Aquí puedes incluir solo el footer -->
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