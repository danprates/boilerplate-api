import { DeleteUserInputDTO, DeleteUserOutputDTO } from '@/application/dtos'
import {
  noContent,
  resultErrorHandler,
  serverError
} from '@/application/helpers'
import { ErrorModel } from '@/application/models'
import {
  Controller,
  HardDeleteRepository,
  Logger,
  SoftDeleteRepository,
  Validator
} from '@/application/protocols'

type Props = {
  validation: Validator
  deleteRepository: HardDeleteRepository | SoftDeleteRepository
  logger: Logger
}

export class DeleteUserController
  implements Controller<DeleteUserInputDTO, DeleteUserOutputDTO>
{
  constructor(private readonly props: Props) {}

  async handler(request: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
    try {
      this.props.logger.info('Started')
      this.props.logger.debug('Request data:', request)

      const validateResult = this.props.validation.run(request)
      if (validateResult.isFailure) {
        this.props.logger.warn('Request data is invalid')
        return resultErrorHandler(validateResult.error)
      }

      const { params } = validateResult.getValue()

      const wasDeleted = await this.props.deleteRepository.delete(params.id)
      if (wasDeleted.isFailure) {
        this.props.logger.warn('Repository returned an error')
        return resultErrorHandler(ErrorModel.notFound())
      }

      this.props.logger.info('Finished')
      return noContent()
    } catch (error) {
      this.props.logger.error(error.message, error)
      return serverError()
    }
  }
}
