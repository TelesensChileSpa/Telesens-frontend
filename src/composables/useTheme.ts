export const useTheme = () => {
  const colorMode = useColorMode();

  // Establecer el valor inicial usando el almacenamiento local
  const isDarkMode = computed(() => colorMode.value === 'dark');

  // Asegurarse de que el valor predeterminado sea el correcto
  if (colorMode.value === undefined) {
    // Si no hay valor en `localStorage`, puedes configurarlo manualmente
    // como 'light' o 'dark' según prefieras como predeterminado.
    colorMode.value = 'light'; // Asegúrate de que esto sea el valor que quieres.
  }

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  };

  return { isDarkMode, toggleTheme };
};
