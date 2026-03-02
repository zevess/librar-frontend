import type { IAuthor } from '@/entities/author'
import type { ICategory } from '@/entities/category'
import type { IGenre } from '@/entities/genre'
import type { IPublisher } from '@/entities/publisher'

export interface IBook {
  id: number
  title: string
  slug: string
  description: string
  image?: string
  author: IAuthor
  publisher: IPublisher
  category: ICategory
  genres: {
    data: IGenre[]
  }
  isAvailable: boolean
}

export interface IBookResponse {
  data: IBook[]
  links: {}
  meta: {}
}

export const bookData = [
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: true,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: false,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: true,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: false,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: true,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: false,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: true,
  },
  {
    title: 'Абсолютный Бэтмен. том 1',
    slug: 'absolute-batman',
    author_id: 'Скотт Снайдер',
    category_id: '1',
    publisher_id: '2',
    image: '/src/assets/cover-example.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    isAvailable: false,
  },
]
