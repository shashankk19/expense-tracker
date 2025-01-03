import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import 'vuetify/styles' // Import Vuetify's styles
import '@mdi/font/css/materialdesignicons.css' // Import Material Design Icons (optional)

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        primary: '#00796b', // Teal primary color
        secondary: '#0288d1', // Blue secondary color
        background: '#e0f7fa', // Light cyan background color
        accent: '#ff5722', // Accent color
        error: '#f44336', // Error color
        info: '#2196f3', // Info color
        success: '#4caf50', // Success color
        warning: '#ff9800', // Warning color
      },
      dark: {
        primary: '#388e3c', // Dark green primary color
        background: '#303030', // Dark background color
        accent: '#ff4081', // Accent color
        error: '#f44336', // Error color
        info: '#2196f3', // Info color
        success: '#4caf50', // Success color
        warning: '#ff9800', // Warning color
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
