export interface IUser {
  id: number
  name: string
  email: string
  role: string
}

export interface IUserResponse {
  user: IUser
}

export interface UserState {
  user: IUser | null
  token: string | null
  isAuthentificated: boolean
  isInitialized: boolean
}
