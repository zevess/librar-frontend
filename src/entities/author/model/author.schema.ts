import { z } from 'zod'

export const authorSchema = z.object({
  name: z
    .string('Некорректный формат')
    .min(1, 'Имя не должно быть пустым')
    .nonempty('Имя не должно быть пустым'),
  description: z.string('Некорректный формат'),
})

export type AuthorSchema = z.infer<typeof authorSchema>
