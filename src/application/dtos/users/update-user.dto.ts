import { HttpResponse } from '@/application/protocols'

export type UpdateUserOutputDTO = HttpResponse<null>

export type UpdateUserInputDTO = {
  params: {
    id: string
  }
  query?: {}
  body: {
    name: string
    email: string
    password: string
  }
}
