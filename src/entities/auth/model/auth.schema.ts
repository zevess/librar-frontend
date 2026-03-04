import { z } from 'zod'
export const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string('Некорректный пароль').min(8, 'Пароль слишком короткий, минимум 8 символов'),
})

export const registerSchema = z
  .object({
    name: z.string('Поле не должно быть пустым').min(2, 'Имя слишком короткое, минимум 2 символа'),
    email: z.email('Некорректный email'),
    password: z.string('Некорректный пароль').min(8, 'Пароль слишком короткий, минимум 8 символов'),
    password_confirmation: z
      .string('Некорректный пароль')
      .min(8, 'Пароль слишком короткий, минимум 8 символов'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Пароли не совпадают',
    path: ['password_confirmation'],
  })

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
