import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.initFromCookies()
  const isAuthentificated = userStore.isAuthentificated
  if (to.meta.guest && isAuthentificated) {
    return next({
      name: 'home',
      replace: true,
    })
  }
  if (to.meta.auth && !isAuthentificated) {
    return next({
      name: 'auth',
      replace: true,
    })
  }
  next()
})

router.afterEach((to) => {
  const baseTitle = import.meta.env.VITE_APP_NAME as string
  const metaTitle = to.meta.title as string | undefined
  document.title = metaTitle ? metaTitle : baseTitle
})

export default router
