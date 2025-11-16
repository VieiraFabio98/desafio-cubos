import { UserRepository } from "@modules/user/domain/repository/user-repository"
import { ICreateUserDTO } from "@modules/user/dto/i-create-user-dto"
import { conflictError, created, HttpResponse, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import appDataSource from '@shared/infra/database/data-source'
import bcrypt from "bcrypt"


@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ){}

  async execute({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<HttpResponse> {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userAlreadyExists = await this.userRepository.findByEmail(email)

      if(userAlreadyExists) {
        return conflictError('User already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await this.userRepository.create({ 
        name, 
        email, 
        password: hashedPassword 
      }, queryRunner)

      await queryRunner.commitTransaction()

      delete (user as any).password

      return created(user)

    } catch(error) {
      await queryRunner.rollbackTransaction()
      return serverError(error as Error)
    }
    finally {
      await queryRunner.release()
    }
  }
}

export { CreateUserUseCase }