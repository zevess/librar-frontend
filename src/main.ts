import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import { definePreset, palette } from '@primeuix/themes'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
// d1ebe9
// bededc
// const customColors = palette('#d1ebe9')

// const MyPreset = definePreset(Aura, {
//   semantic: {
//     primary: {
//       50: customColors['50'],
//       100: customColors['100'],
//       200: customColors['200'],
//       300: customColors['300'],
//       400: customColors['400'],
//       500: customColors['500'],
//       600: customColors['600'],
//       700: customColors['700'],
//       800: customColors['800'],
//       900: customColors['900'],
//       950: customColors['950'],
//     },
//     colorScheme: {
//       light: {
//         formField: {
//           hoverBorderColor: '{primary.color}',
//         },
//       },
//       dark: {
//         formField: {
//           hoverBorderColor: '{primary.color}',
//         },
//       },
//     },
//   },
// })
app.use(VueQueryPlugin)
app.use(createPinia())
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

app.mount('#app')
