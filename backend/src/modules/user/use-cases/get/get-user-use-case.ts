import { UserRepository } from "@modules/user/domain/repository/user-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class GetUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.get(id)

      return ok(user)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export { GetUserUseCase }