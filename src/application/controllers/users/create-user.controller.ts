import { CreateUserInputDTO, CreateUserOutputDTO } from '@/application/dtos'
import { created, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  CreateRepository,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  createRepository: CreateRepository
  logger: Logger
}

export class CreateUserController
  implements Controller<CreateUserInputDTO, CreateUserOutputDTO>
{
  constructor(private readonly props: Props) {}

  async handler(request: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const requestValidated = this.props.validation.run(request)
      if (requestValidated.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(requestValidated.error)
      }

      const { body } = requestValidated.getValue()

      const result = await this.props.createRepository.create(body)
      if (result.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      this.props.logger.info('Finished')
      return created(result.getValue())
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
