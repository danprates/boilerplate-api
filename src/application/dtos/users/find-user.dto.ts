import { UserModel } from '@/application/models/user.model'
import { HttpResponse } from '@/application/protocols'

export type FindUserOutputDTO = HttpResponse<UserModel>

export type FindUserInputDTO = {
  params: {
    id: string
  }
  query?: {}
  body?: {}
}
