import { z } from 'zod'

export const authorSchema = z.object({
  name: z
    .string('Некорректный формат')
    .min(1, 'Название не должно быть пустым')
    .nonempty('Название не должно быть пустым'),
  description: z.string('Некорректный формат'),
})

export type AuthorSchema = z.infer<typeof authorSchema>
