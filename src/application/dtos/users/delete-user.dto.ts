import { HttpResponse } from '@/application/protocols'

export type DeleteUserOutputDTO = HttpResponse<null>

export type DeleteUserInputDTO = {
  params: {
    id: string
  }
  query?: {}
  body?: {}
}
