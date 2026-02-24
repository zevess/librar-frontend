export interface IPublisher {
  name: string
  slug?: string
  description?: string
}

export const publisherData: IPublisher[] = [
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
