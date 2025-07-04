<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import Footer from '~/components/Footer.vue'

// Estado del sidebar
const sidebarCollapsed = ref(false)
const mounted = ref(false)

// Manejo responsive
const isMobile = ref(false)

// Computadas para el layout responsivo
const containerClass = computed(() => {
  const baseClasses = 'h-screen flex flex-col transition-all duration-300 ease-in-out'
  return baseClasses
})

const contentWrapperClass = computed(() => {
  const baseClasses = 'flex flex-1 min-h-0'
  return baseClasses
})

const mainContentClass = computed(() => {
  const baseClasses = 'flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-0'
  return baseClasses
})

// Función para detectar dispositivo móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
 
  // Auto-colapsar en dispositivos móviles
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
}

// Escuchar cambios en el sidebar
const handleSidebarToggle = (collapsed: boolean) => {
  sidebarCollapsed.value = collapsed
}

// Función para cerrar sidebar en móvil
const closeSidebarOnMobile = () => {
  if (isMobile.value && !sidebarCollapsed.value) {
    sidebarCollapsed.value = true
  }
}

onMounted(() => {
  mounted.value = true
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div :class="containerClass" class="transition-colors duration-300 bg-[#f2f2f2] text-gray-900 dark:bg-gray-900 dark:text-white">
   
    <!-- Navbar que ocupa todo el ancho -->
    <Navbar />
    
    <!-- Contenedor principal con sidebar y contenido -->
    <div :class="contentWrapperClass">
     
      <!-- Sidebar -->
      <Sidebar
        :default-collapsed="sidebarCollapsed"
        @toggle="handleSidebarToggle"
        class="flex-shrink-0"
      />
     
      <!-- Contenido principal centrado y responsivo -->
      <div :class="mainContentClass">
        <main class="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 min-h-0">
          <div class="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            <div class="flex items-center justify-center min-h-full">
              <div class="w-full px-2 sm:px-4 md:px-6 lg:px-8">
                <slot />  <!-- Aquí se inserta el contenido de las páginas -->
              </div>
            </div>
          </div>
        </main>
      </div>
     
    </div>
   
    <!-- Footer que ocupa todo el ancho -->
    <Footer />
   
    <!-- Overlay para móviles -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!sidebarCollapsed && isMobile && mounted"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        @click="closeSidebarOnMobile"
      />
    </Transition>
   
  </div>
</template>

<style scoped>
/* Scrollbar personalizada */
main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Modo oscuro para scrollbar */
.dark main::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark main::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Asegurar que el footer tenga el espacio correcto */
footer {
  flex-shrink: 0;
}

/* Asegurar que el contenido se centre correctamente y sea responsivo */
main {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Evitar scroll innecesario */
.content-wrapper {
  min-height: 0;
  flex: 1;
}

/* Ajustes responsivos adicionales */
@media (max-width: 640px) {
  main {
    padding: 0.75rem !important;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  main {
    padding: 1rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  main {
    padding: 1.5rem !important;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  main {
    padding: 2rem !important;
  }
}

@media (min-width: 1281px) {
  main {
    padding: 2.5rem !important;
  }
}
</style>