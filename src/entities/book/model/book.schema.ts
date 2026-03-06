import { z } from 'zod'

export const bookSchema = z.object({
  title: z
    .string('Некорректный формат')
    .min(1, 'Название не должно быть пустым')
    .nonempty('Название не должно быть пустым'),
  description: z
    .string('Некорректный формат')
    .min(10, 'Минимум 10 символов')
    .nonempty('Название не должно быть пустым'),
  author_id: z
    .number('Некорректный формат. Введите число')
    .nonnegative('Число не должно быть отрицательным'),
  category_id: z
    .number('Некорректный формат. Введите число')
    .nonnegative('Число не должно быть отрицательным'),
  publisher_id: z
    .number('Некорректный формат. Введите число')
    .nonnegative('Число не должно быть отрицательным'),
})

export type BookSchema = z.infer<typeof bookSchema>
