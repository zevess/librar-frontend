import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { ProfilePage } from '@/pages/profile'
import { CatalogPage } from '@/pages/catalog'
import { BookPage } from '@/pages/book'
import { AuthorPage } from '@/pages/author'
import { PublisherPage } from '@/pages/publisher'
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
import { NotFoundPage } from '@/pages/not-found'
import { CreateCategoryPage } from '@/pages/create-category'
import { CreateGenrePage } from '@/pages/create-genre'
import { ForgotPasswordPage } from '@/pages/forgot-password'
import { ResetPasswordPage } from '@/pages/reset-password'
import { VerifyPage } from '@/pages/verify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { layout: 'default', title: 'Главная' },
    },
    {
      path: '/me',
      name: 'profile',
      component: ProfilePage,
      meta: { layout: 'default', auth: true, title: 'Профиль' },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage,
      meta: { layout: 'default', title: 'Каталог' },
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
          meta: { layout: 'admin', admin: true, title: 'Пользователи' },
        },
        {
          path: 'authors',
          name: 'authors',
          component: AdminAuthorsPage,
          meta: { layout: 'admin', admin: true, title: 'Авторы' },
        },
        {
          path: 'authors/create',
          name: 'authors/create',
          component: CreateAuthorPage,
          meta: { layout: 'admin', admin: true, title: 'Создать автора' },
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
          meta: { layout: 'admin', admin: true, title: 'Брони' },
        },
        {
          path: 'books',
          name: 'books',
          component: AdminBooksPage,
          meta: { layout: 'admin', admin: true, title: 'Книги' },
        },
        {
          path: 'books/create',
          name: 'books/create',
          component: CreateBookPage,
          meta: { layout: 'admin', admin: true, title: 'Создать книгу' },
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
          meta: { layout: 'admin', admin: true, title: 'Издательства' },
        },
        {
          path: 'publishers/create',
          name: 'publishers/create',
          component: CreatePublisherPage,
          meta: { layout: 'admin', admin: true, title: 'Создать издательство' },
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
          meta: { layout: 'admin', admin: true, title: 'Категории' },
        },
        {
          path: 'categories/create',
          name: 'categories/create',
          component: CreateCategoryPage,
          meta: { layout: 'admin', admin: true, title: 'Создать категорию' },
        },
        {
          path: 'genres',
          name: 'genres',
          component: AdminGenresPage,
          meta: { layout: 'admin', admin: true, title: 'Жанры' },
        },
        {
          path: 'genres/create',
          name: 'genres/create',
          component: CreateGenrePage,
          meta: { layout: 'admin', admin: true, title: 'Создать жанр' },
        },
      ],
      beforeEnter: async (to, from) => {
        const userStore = useUserStore()
        userStore.initFromCookies()

        if (userStore.token && !userStore.user) {
          try {
            const profile = await userService.me()
            userStore.setUser(profile.data)
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
      path: '/email-verify',
      name: 'email-verify',
      component: VerifyPage,
      meta: { layout: 'default' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { layout: 'auth', guest: true, title: 'Авторизация' },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage,
      meta: { layout: 'auth', guest: true, title: 'Сброс пароля' },
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPasswordPage,
      meta: { layout: 'auth', guest: true, title: 'Новый пароль' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: {
        layout: 'default',
        title: 'Не найдено',
      },
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

router.afterEach((to) => {
  const baseTitle = 'Librar'
  const metaTitle = to.meta.title as string | undefined
  document.title = metaTitle ? metaTitle : baseTitle
})

export default router
