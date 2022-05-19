import { FindUserInputDTO, FindUserOutputDTO } from '@/application/dtos'
import { ok, resultErrorHandler, serverError } from '@/application/helpers'
import {
  Controller,
  FindRepository,
  Logger,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  findRepository: FindRepository
  logger: Logger
}

export class FindUserController
  implements Controller<FindUserInputDTO, FindUserOutputDTO>
{
  constructor(private readonly props: Props) {}

  async handler(request: FindUserInputDTO): Promise<FindUserOutputDTO> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const validationResult = this.props.validation.run(request)
      if (validationResult.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(validationResult.error)
      }

      const { params } = validationResult.getValue()

      const result = await this.props.findRepository.find(params.id)
      if (result.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(result.error)
      }

      this.props.logger.info('Finished')
      return ok(result.getValue())
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
