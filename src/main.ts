import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import { definePreset, palette } from '@primeuix/themes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { ConfirmationService, ToastService } from 'primevue'

const app = createApp(App)
const pinia = createPinia()
app.use(ToastService)
app.use(ConfirmationService)
app.use(pinia)
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
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')
