import type { IUser } from '@/entities/user'

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface IAuthResponse {
  user: IUser
  token: string
}

export interface IResetLinkSentResponse {
  message: string
  success: boolean
}

export interface IResetPassword {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface IVerify {
  id: string
  hash: string
  expires: string
  signature: string
}
