import { UserModel } from '@/application/models/user.model'
import { HttpResponse, Pagination } from '@/application/protocols'

export type ListUserOutputDTO = HttpResponse<Pagination<UserModel>>

export type ListUserInputDTO = {
  params?: {}
  query?: {}
  body?: {}
}
