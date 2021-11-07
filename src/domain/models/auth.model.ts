import { BaseModel } from '.'

export type AuthModel = BaseModel & {
  email: string
  password: string
  passwordToken?: string
}
