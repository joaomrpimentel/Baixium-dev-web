<template>
    <div>
        <q-toggle
          v-model="darkMode"
          checked-icon="dark_mode"
          color="yellow"
          unchecked-icon="light_mode"
        />
    </div>
  </template>
  
  <script>
  import { watch, ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  
  export default {
    name: 'DarkModeToggle',
    setup() {
      const $q = useQuasar();
      const darkMode = ref(false);
  
      const toggleDarkMode = () => {
        if (darkMode.value) {
          $q.dark.set(true);
        } else {
          $q.dark.set(false);
        }
         // Update localStorage after setting dark mode with Quasar
        localStorage.setItem('darkMode', darkMode.value);
      };
  
      // Watcher to react to changes in the darkMode ref
      watch(darkMode, (newValue) => {
        toggleDarkMode(newValue);
        console.log('Dark mode toggled', newValue);
      });
  
      // Load the dark mode preference on mount
      onMounted(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
          darkMode.value = true;
          $q.dark.set(true);
        } else {
          darkMode.value = false;
          $q.dark.set(false);
        }
      });
  
      return {
        darkMode,
        toggleDarkMode
      };
    }
  };
  </script>
