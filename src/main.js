import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
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
        primary: '#3f51b5', // Custom primary color
        secondary: '#ff4081', // Custom secondary color
        background: '#f5f5f5', // Custom background color
      },
      dark: {
        primary: '#1e88e5', // Custom dark theme primary
        background: '#212121',
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
