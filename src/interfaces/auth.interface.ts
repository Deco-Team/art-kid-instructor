import { IUser } from './user.interface'

export interface IAuthContextProps {
  user: IUser | undefined
  idToken: string | null
  login: ({ email, password }: ILoginFormProps) => Promise<void>
  logout: () => Promise<void>
}

export interface ILoginFormProps {
  email: string
  password: string
}
