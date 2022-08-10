import { UpdateUserInputDTO, UpdateUserOutputDTO } from '@/application/dtos'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import {
  Controller,
  Logger,
  UpdateRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  updateRepository: UpdateRepository
  logger: Logger
}

export default class UpdateUser
  implements Controller<UpdateUserInputDTO, UpdateUserOutputDTO>
{
  constructor(private readonly props: Props) {}

  async handler(request: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const validationResult = this.props.validation.run(request)
      if (validationResult.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(validationResult.error)
      }

      const { params, body } = validationResult.getValue()

      const wasUpdated = await this.props.updateRepository.update(
        params.id,
        body
      )

      if (wasUpdated.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(wasUpdated.error)
      }

      this.props.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
