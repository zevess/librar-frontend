export const APP_URL = import.meta.env.VITE_APP_URL as string

export const PUBLIC_URL = {
  root: (url = '') => `${url ? url : ''}`,
  home: () => PUBLIC_URL.root('/'),

  auth: () => PUBLIC_URL.root(`/auth`),

  profile: () => PUBLIC_URL.root(`/me`),

  catalog: () => PUBLIC_URL.root(`/catalog`),
  books: (url = '') => PUBLIC_URL.root(`/book${url}`),
  book: (bookSlug = '', bookId = '') => PUBLIC_URL.root(`/book/${bookSlug}-${bookId}`),

  publishers: (url = '') => PUBLIC_URL.root(`/publishers${url}`),
  publisher: (publisherSlug = '') => PUBLIC_URL.root(`/publishers/${publisherSlug}`),

  admin: (url = '') => PUBLIC_URL.root(`/admin${url}`),
  adminUsers: () => PUBLIC_URL.admin(`/users`),
  adminBooks: () => PUBLIC_URL.admin(`/books`),
  adminReservations: () => PUBLIC_URL.admin(`/reservations`),
  adminPublishers: () => PUBLIC_URL.admin(`/publishers`),
  adminAuthors: () => PUBLIC_URL.admin(`/authors`),
  adminCategories: () => PUBLIC_URL.admin(`/categories`),
  adminGenres: () => PUBLIC_URL.admin(`/genres`),
}
