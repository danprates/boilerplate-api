import { UserModel } from '@/application/models/user.model'
import { HttpResponse } from '@/application/protocols'

export type CreateUserOutputDTO = HttpResponse<UserModel>

export type CreateUserInputDTO = {
  params?: {}
  query?: {}
  body: {
    name: string
    email: string
    password: string
  }
}
