import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { ProfilePage } from '@/pages/profile'
import { CatalogPage } from '@/pages/catalog'
import { BookPage } from '@/pages/book'
import { AuthorPage } from '@/pages/author'
import { PublisherPage } from '@/pages/publisher'
import { AdminPage } from '@/pages/admin'
import { AdminUsersPage } from '@/pages/admin-users'
import { AdminAuthorsPage } from '@/pages/admin-authors'
import { AdminReservationsPage } from '@/pages/admin-reservations'
import { AdminBooksPage } from '@/pages/admin-books'
import { AdminPublishersPage } from '@/pages/admin-publishers'
import { CreateBookPage } from '@/pages/create-book'
import { EditBookPage } from '@/pages/edit-book'
import { CreatePublisherPage } from '@/pages/create-publisher'
import { EditPublisherPage } from '@/pages/edit-publisher'
import { CreateAuthorPage } from '@/pages/create-author'
import { EditAuthorPage } from '@/pages/edit-author'
import { AdminCategoriesPage } from '@/pages/admin-categories'
import { AuthPage } from '@/pages/auth'
import { useProfile, userService, useUserStore } from '@/entities/user'
import { computed } from 'vue'
import { AdminGenresPage } from '@/pages/admin-genres'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { layout: 'default' },
    },
    {
      path: '/me',
      name: 'profile',
      component: ProfilePage,
      meta: { layout: 'default', auth: true },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage,
      meta: { layout: 'default' },
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: BookPage,
      meta: { layout: 'default' },
    },
    {
      path: '/author/:slug',
      name: 'author',
      component: AuthorPage,
      meta: { layout: 'default' },
    },
    {
      path: '/publisher/:slug',
      name: 'publisher',
      component: PublisherPage,
      meta: { layout: 'default' },
    },

    {
      path: '/admin',
      name: 'admin',
      redirect: {
        name: 'admin/reservations',
      },
      meta: { layout: 'admin', admin: true },
      children: [
        {
          path: 'users',
          name: 'users',
          component: AdminUsersPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'authors',
          name: 'authors',
          component: AdminAuthorsPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'authors/create',
          name: 'authors/create',
          component: CreateAuthorPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'authors/:authorSlug/edit',
          name: 'authors/edit',
          component: EditAuthorPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'reservations',
          name: 'admin/reservations',
          component: AdminReservationsPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'books',
          name: 'books',
          component: AdminBooksPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'books/create',
          name: 'books/create',
          component: CreateBookPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'books/:bookSlug/edit',
          name: 'books/edit',
          component: EditBookPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'publishers',
          name: 'publishers',
          component: AdminPublishersPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'publishers/create',
          name: 'publishers/create',
          component: CreatePublisherPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'publishers/:publisherSlug/edit',
          name: 'publishers/edit',
          component: EditPublisherPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'categories',
          name: 'categories',
          component: AdminCategoriesPage,
          meta: { layout: 'admin', admin: true },
        },
        {
          path: 'genres',
          name: 'genres',
          component: AdminGenresPage,
          meta: { layout: 'admin', admin: true },
        },
      ],
      beforeEnter: async (to, from) => {
        const userStore = useUserStore()
        userStore.initFromCookies()

        if (userStore.token && !userStore.user) {
          try {
            const profile = await userService.me()
            userStore.setUser(profile.user)
          } catch {
            userStore.clear()
          }
        }

        if (userStore.user?.role !== 'admin' && userStore.user?.role !== 'librarian') {
          return {
            name: 'home',
          }
        }
      },
    },

    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { layout: 'auth', guest: true },
    },
  ],
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

export default router
