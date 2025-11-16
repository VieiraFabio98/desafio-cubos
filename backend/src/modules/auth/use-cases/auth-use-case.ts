import { UserRepository } from "@modules/user/domain/repository/user-repository"
import { created, HttpResponse, notFound, serverError, unauthorized } from "@shared/helpers"
import { inject, injectable } from "tsyringe"
import appDataSource from '@shared/infra/database/data-source'
import bcrypt from "bcrypt"
import crypto from "crypto"
import { IAuthDTO } from "../dto/i-auth-dto"
import { AuthRepository } from "../domain/repository/auth-repository"


@injectable()
class AuthUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('AuthRepository')
    private authRepository: AuthRepository,
  ){}

  async execute({
    userIdentifier,
    password
  }: IAuthDTO): Promise<HttpResponse> {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const user = await this.userRepository.getUserByIdentifier(userIdentifier)

      if(!user) {
        return notFound('User not found')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if(!passwordMatch) {
        return unauthorized()
      }

      const randomBytes = crypto.randomBytes(32).toString("hex")
      const createdToken = `${user.id}.${randomBytes}`
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      const token = await this.authRepository.generateToken(user, createdToken, expiresAt, queryRunner)
      const expiresAtPtBr = token.expiresAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

      await queryRunner.commitTransaction()

      return created({token: token.token, expiresAt: expiresAtPtBr})

    } catch(error) {
      await queryRunner.rollbackTransaction()
      return serverError(error as Error)
    }
    finally {
      await queryRunner.release()
    }
  }
}

export { AuthUseCase }