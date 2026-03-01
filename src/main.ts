import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import { definePreset, palette } from '@primeuix/themes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { useUserStore } from './stores/counter'

const app = createApp(App)
const pinia = createPinia()
app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

// const authStore = useUserStore(pinia)

app.mount('#app')
