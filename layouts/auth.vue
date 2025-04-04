<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col justify-between bg-whiteContent w-screen h-screen">
    <!-- Contenido principal (login form o similar) -->
    <slot />

    <!-- Footer -->
    <footer class="mt-auto">
      <div class="bg-gradient-to-r from-[#66BB6A] via-[#4CAF50] to-[#2C6B2F] h-2 mt-2" />
      <section
        class="border-t-2 py-4 px-14 flex flex-col items-center text-center gap-2 lg:flex-row lg:justify-between text-grayColor">
        <h4>Copyright © 2025 Telesens Chile.</h4>
        <div class="flex gap-1">
          <a href="https://instagram.com/TelesensChile" target="_blank" rel="noopener noreferrer">
            <UIcon name="i-fa6-brands-instagram" class="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/company/TelesensChile/" target="_blank" rel="noopener noreferrer">
            <UIcon name="i-fa6-brands-linkedin" class="w-6 h-6" />
          </a>
        </div>
      </section>
    </footer>
  </div>
</template>
