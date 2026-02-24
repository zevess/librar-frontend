export const APP_URL = import.meta.env.VITE_APP_URL as string

export const PUBLIC_URL = {
  root: (url = '') => `${url ? url : ''}`,
  home: () => PUBLIC_URL.root('/'),

  auth: () => PUBLIC_URL.root(`/auth`),

  profile: () => PUBLIC_URL.root(`/me`),

  catalog: () => PUBLIC_URL.root(`/catalog`),
  books: (url = '') => PUBLIC_URL.root(`/book${url}`),
  book: (bookSlug = '', bookId = '') => PUBLIC_URL.root(`/book/${bookSlug}-${bookId}`),

  authors: (url = '') => PUBLIC_URL.root(`/author${url}`),
  author: (authorSlug = '') => PUBLIC_URL.root(`/author${authorSlug}`),

  publishers: (url = '') => PUBLIC_URL.root(`/publisher${url}`),
  publisher: (publisherSlug = '') => PUBLIC_URL.root(`/publisher/${publisherSlug}`),

  admin: (url = '') => PUBLIC_URL.root(`/admin${url}`),
  adminUsers: () => PUBLIC_URL.admin(`/users`),
  adminBooks: () => PUBLIC_URL.admin(`/books`),
  adminReservations: () => PUBLIC_URL.admin(`/reservations`),
  adminPublishers: () => PUBLIC_URL.admin(`/publishers`),
  adminAuthors: () => PUBLIC_URL.admin(`/authors`),
  adminCategories: () => PUBLIC_URL.admin(`/categories`),
  adminGenres: () => PUBLIC_URL.admin(`/genres`),
}
