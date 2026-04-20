import type { IBook } from '@/entities/book'

export interface IPublisher {
  id: number
  name: string
  slug: string
  description?: string
  isDeleted: boolean
  books: {
    data: IBook[]
  }
}

export interface IPublisherForm {
  name: string
  description?: string
}

export interface IPublisherParams {
  q?: string | null
  id?: string | null
  page?: number
}

export const publisherData = [
  {
    name: 'Азбука',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a volutpat lorem. In accumsan dolor lobortis dictum porta. Cras maximus dictum tristique. Phasellus placerat mattis mauris non tempus. Nunc vitae laoreet arcu, vel maximus diam. Ut feugiat mollis sollicitudin. Nulla euismod elit ut erat congue, non blandit erat consequat. Donec metus felis, placerat eget condimentum ac, mattis lacinia est. Cras nisi ex, gravida sit amet urna sed, eleifend ultricies erat.',
    slug: 'azbooka',
  },
  {
    name: 'Комильфо',
    slug: 'komilfo',
  },
  {
    name: 'Bubble',
    slug: 'bubble',
  },
  {
    name: 'Fanzon',
    slug: 'fanzon',
  },
]
