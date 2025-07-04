<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { vAutoAnimate } from '@formkit/auto-animate'
import { 
  Home, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell
} from '~/composables/useIcons'
import { useTheme } from '~/composables/useTheme'

// Props
interface Props {
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false
})

// Emits
const emit = defineEmits<{
  toggle: [collapsed: boolean]
}>()

// Composables
const route = useRoute()
const router = useRouter()
const { isDarkMode } = useTheme()

// Estado
const isCollapsed = ref(props.defaultCollapsed)
const mounted = ref(false)

// Elementos del menú
const menuItems = [
  {
    name: 'Inicio',
    icon: Home,
    path: '/',
    badge: null
  },
  {
    name: 'Usuarios',
    icon: Users,
    path: '/usuarios',
    badge: null
  },
  {
    name: 'Reportes',
    icon: BarChart3,
    path: '/reportes',
    badge: null
  },
  {
    name: 'Documentos',
    icon: FileText,
    path: '/documentos',
    badge: 3
  },
  {
    name: 'Calendario',
    icon: Calendar,
    path: '/calendario',
    badge: null
  },
  {
    name: 'Mensajes',
    icon: MessageSquare,
    path: '/mensajes',
    badge: 12
  },
  {
    name: 'Notificaciones',
    icon: Bell,
    path: '/notificaciones',
    badge: 5
  },
  {
    name: 'Configuración',
    icon: Settings,
    path: '/configuracion',
    badge: null
  }
]

// Computadas
const sidebarWidth = computed(() => isCollapsed.value ? 'w-16' : 'w-64')
const currentPath = computed(() => route.path)

// Métodos
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle', isCollapsed.value)
}

const navigateTo = (path: string) => {
  router.push(path)
}

const isActive = (path: string) => {
  return currentPath.value === path
}

// Watchers
watch(() => props.defaultCollapsed, (newValue) => {
  isCollapsed.value = newValue
})

// Lifecycle
onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <!-- Contenedor principal del sidebar con espacios laterales consistentes -->
  <div class="flex h-full p-3">
    <aside 
      :class="[
        'flex flex-col transition-all duration-300 ease-in-out z-20',
        'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700',
        'shadow-lg rounded-2xl overflow-hidden',
        'h-full', // Asegura que ocupe toda la altura disponible
        sidebarWidth
      ]"
      v-auto-animate
    >
      <!-- Header del sidebar -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg h-16 flex-shrink-0">
        <div v-if="!isCollapsed" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <span class="font-semibold text-gray-800 dark:text-gray-200">Menú</span>
        </div>
        
        <button
          @click="toggleSidebar"
          class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          :class="isCollapsed ? 'w-full justify-center' : ''"
        >
          <ChevronLeft 
            v-if="!isCollapsed" 
            class="w-5 h-5 text-gray-600 dark:text-gray-400" 
          />
          <ChevronRight 
            v-else 
            class="w-5 h-5 text-gray-600 dark:text-gray-400" 
          />
        </button>
      </div>

      <!-- Menú de navegación centrado verticalmente -->
      <nav class="flex-1 overflow-y-auto p-4 min-h-0 flex flex-col justify-center">
        <ul class="space-y-3" v-auto-animate>
          <li v-for="item in menuItems" :key="item.path" class="relative">
            <button
              @click="navigateTo(item.path)"
              :class="[
                'w-full flex items-center rounded-xl transition-all duration-200 group relative',
                'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02]',
                isActive(item.path) 
                  ? 'bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white shadow-md' 
                  : 'text-gray-700 dark:text-gray-300',
                isCollapsed ? 'p-3 justify-center' : 'p-3'
              ]"
            >
              <!-- Icono -->
              <component 
                :is="item.icon" 
                :class="[
                  'transition-transform duration-200',
                  isActive(item.path) ? 'text-white' : 'text-gray-600 dark:text-gray-400',
                  'group-hover:scale-110',
                  isCollapsed ? 'w-6 h-6' : 'w-5 h-5'
                ]"
              />
              
              <!-- Texto y badge -->
              <div 
                v-if="!isCollapsed" 
                class="flex items-center justify-between w-full ml-3"
              >
                <span 
                  :class="[
                    'font-medium transition-colors duration-200',
                    isActive(item.path) ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ item.name }}
                </span>
                
                <!-- Badge -->
                <span 
                  v-if="item.badge" 
                  :class="[
                    'px-2 py-1 text-xs rounded-full font-semibold',
                    isActive(item.path) 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#4CAF50] text-white'
                  ]"
                >
                  {{ item.badge }}
                </span>
              </div>
            </button>
            
            <!-- Tooltip para modo colapsado -->
            <div 
              v-if="isCollapsed && mounted"
              class="absolute left-full ml-2 bg-gray-900 text-white px-3 py-2 rounded-xl text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none whitespace-nowrap"
            >
              {{ item.name }}
              <span v-if="item.badge" class="ml-2 px-2 py-1 bg-[#4CAF50] rounded-full text-xs">
                {{ item.badge }}
              </span>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Footer del sidebar -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg h-20 flex-shrink-0">
        <div 
          v-if="!isCollapsed" 
          class="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <div class="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-xs">U</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              Usuario
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              usuario@ejemplo.com
            </p>
          </div>
        </div>
        
        <div 
          v-else 
          class="flex justify-center items-center h-full"
        >
          <div class="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-xs">U</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Animación personalizada para el sidebar */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Scrollbar personalizada */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Modo oscuro para scrollbar */
.dark nav::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark nav::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>