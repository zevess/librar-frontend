import { userService, useUserStore } from '@/entities/user'
import { AdminAuthorsPage } from '@/pages/admin-authors'
import { AdminBooksPage } from '@/pages/admin-books'
import { AdminCategoriesPage } from '@/pages/admin-categories'
import { AdminGenresPage } from '@/pages/admin-genres'
import { AdminPublishersPage } from '@/pages/admin-publishers'
import { AdminReservationsPage } from '@/pages/admin-reservations'
import { AdminReviewsPage } from '@/pages/admin-reviews'
import { AdminUsersPage } from '@/pages/admin-users'
import { AuthPage } from '@/pages/auth'
import { AuthorPage } from '@/pages/author'
import { BookPage } from '@/pages/book'
import { CatalogPage } from '@/pages/catalog'
import { CreateAuthorPage } from '@/pages/create-author'
import { CreateBookPage } from '@/pages/create-book'
import { CreateCategoryPage } from '@/pages/create-category'
import { CreateGenrePage } from '@/pages/create-genre'
import { CreatePublisherPage } from '@/pages/create-publisher'
import { EditAuthorPage } from '@/pages/edit-author'
import { EditBookPage } from '@/pages/edit-book'
import { EditPublisherPage } from '@/pages/edit-publisher'
import { ForgotPasswordPage } from '@/pages/forgot-password'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { ProfilePage } from '@/pages/profile'
import { PublisherPage } from '@/pages/publisher'
import { ResetPasswordPage } from '@/pages/reset-password'
import { VerifyPage } from '@/pages/verify'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
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
        path: 'authors/:slug/edit',
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
        path: 'books/:slug/edit',
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
        path: 'publishers/:slug/edit',
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
      {
        path: 'reviews',
        name: 'reviews',
        component: AdminReviewsPage,
        meta: { layout: 'admin', admin: true, title: 'Отзывы' },
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
]
