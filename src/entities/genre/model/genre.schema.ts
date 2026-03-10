import { z } from 'zod'

export const genreSchema = z.object({
  name: z
    .string('Некорректный формат')
    .min(1, 'Название не должно быть пустым')
    .nonempty('Название не должно быть пустым'),
  book: z
    .number('Некорректный формат. Введите число')
    .nonnegative('Число не должно быть отрицательным')
    .optional(),
  genres: z
    .number('Некорректный формат. Введите число')
    .nonnegative('Число не должно быть отрицательным')
    .optional(),
})

export type GenreSchema = z.infer<typeof genreSchema>
