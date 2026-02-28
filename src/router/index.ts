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
      meta: { layout: 'default' },
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
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/users',
      name: 'admin/users',
      component: AdminUsersPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/authors',
      name: 'admin/authors',
      component: AdminAuthorsPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/authors/create',
      name: 'admin/authors/create',
      component: CreateAuthorPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/authors/:authorSlug/edit',
      name: 'admin/authors/edit',
      component: EditAuthorPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/reservations',
      name: 'admin/reservations',
      component: AdminReservationsPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/books',
      name: 'admin/books',
      component: AdminBooksPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/books/create',
      name: 'admin/books/create',
      component: CreateBookPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/books/:bookSlug/edit',
      name: 'admin/books/edit',
      component: EditBookPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/publishers',
      name: 'admin/publishers',
      component: AdminPublishersPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/publishers/create',
      name: 'admin/publishers/create',
      component: CreatePublisherPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/publishers/:publisherSlug/edit',
      name: 'admin/publishers/edit',
      component: EditPublisherPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/admin/categories',
      name: 'admin/publishers',
      component: AdminCategoriesPage,
      meta: { layout: 'admin' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { layout: 'auth' },
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
