import { defineStore } from 'pinia'
import { useToast } from 'primevue'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toast: useToast(),
  }),
  actions: {
    success(title: string, message: string) {
      this.toast.add({
        severity: 'success',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    info(title: string, message: string) {
      this.toast.add({
        severity: 'info',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    warn(title: string, message: string) {
      this.toast.add({
        severity: 'warn',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    error(title: string, message: string) {
      this.toast.add({
        severity: 'error',
        summary: title,
        detail: message,
      })
    },
  },
})
