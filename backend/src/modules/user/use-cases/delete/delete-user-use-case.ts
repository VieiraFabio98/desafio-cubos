import { UserRepository } from "@modules/user/domain/repository/user-repository"
import appDataSource from "@shared/infra/database/data-source"
import { HttpResponse, noContent, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {

      await this.userRepository.delete(id, queryRunner)

      await queryRunner.commitTransaction()

      return noContent()

    } catch(error) {
      return serverError(error as Error)
    } finally {

    }
  }
}

export { DeleteUserUseCase }