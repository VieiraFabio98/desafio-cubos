import { QueryRunner, Repository } from "typeorm"
import appDataSource from "@shared/infra/database/data-source"
import { UserTokens } from "../entities/user-tokens"
import { User } from "@modules/user/domain/entities/user"


class AuthRepository {

  private repository: Repository<UserTokens>

  constructor() {
    this.repository = appDataSource.getRepository(UserTokens)
  }

  async generateToken(user: User, token: string, expiresAt: Date, queryRunner: QueryRunner): Promise<UserTokens> {
    try {
      const userTokens = this.repository.create({
        user,
        token,
        expiresAt
      })

      await queryRunner.manager.save(userTokens)

      return userTokens

    } catch(error) {
      throw error
    }
  }

}

export { AuthRepository }