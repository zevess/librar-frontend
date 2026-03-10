import { z } from 'zod'

export const categorySchema = z.object({
  name: z
    .string('Некорректный формат')
    .min(1, 'Название не должно быть пустым')
    .nonempty('Название не должно быть пустым'),
  description: z.string('Некорректный формат'),
})

export type CategorySchema = z.infer<typeof categorySchema>
