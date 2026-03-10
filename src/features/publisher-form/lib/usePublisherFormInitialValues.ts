import type { IPublisher } from '@/entities/publisher'

export const usePublisherFormInitialValues = (publisher: IPublisher | undefined) => {
  return {
    name: publisher ? publisher.name : '',
    description: publisher ? publisher.description : '',
  }
}
