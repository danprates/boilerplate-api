import { BaseModel } from '.'

export type AuthModel = BaseModel & {
  email: string
  password: string
  passwordResetToken?: string
}
