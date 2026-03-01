export interface IUser {
  id: number
  name: string
  email: string
  role: string
}

export interface IUserResponse {
  user: IUser
}
