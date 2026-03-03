import { z } from 'zod'
export const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string('Некорректный пароль').min(8, 'Пароль слишком короткий'),
})

export type LoginSchema = z.infer<typeof loginSchema>
