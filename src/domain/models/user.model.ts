import { AuthModel } from './auth.model'

export type UserModel = AuthModel & {
  name: string
}
