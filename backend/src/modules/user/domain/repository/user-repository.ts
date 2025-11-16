import { QueryRunner, Repository } from "typeorm"
import { User } from "../entities/user"
import appDataSource from "@shared/infra/database/data-source"
import { ICreateUserDTO } from "@modules/user/dto/i-create-user-dto"


class UserRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(User)
  }

  async create(data: ICreateUserDTO, queryRunner: QueryRunner): Promise<User> {
    try {
      const user = this.repository.create(data)

      const result = await queryRunner.manager.save(user)

      return result
      
    }catch(error) {
      throw error 
    }
  }

  async get(id: string): Promise<User | null> {
    try {
      console.log(id)
      const user = await this.repository.findOne({ where: {id: id}})
      
      return user
    } catch(error) {
      throw error
    }
  }

  async update(user: User, queryRunner: QueryRunner): Promise<User> {
    try {

      await queryRunner.manager.update(User, user.id, user)

      const updatedUser = await queryRunner.manager.findOneBy(User, { id: user.id })

      if (!updatedUser) {
        throw new Error('Usuário não encontrado após atualização')
      }
  
      return updatedUser

    } catch(error) {
      throw error
    }
  }

  async delete(id: string, queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager.delete(User, id)
    } catch(error) {
      throw error
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.repository.findOneBy({ email: email})
      
      return user
    } catch(error) {
      throw error
    }
  }

  async getUserByIdentifier(userIdentifier: string): Promise<User | null> {
    try {

      const user = await this.repository.findOne({
        where: [
          { email: userIdentifier },
          { name: userIdentifier }
        ]
      })

      return user

    } catch(error) {
      throw error
    }
  }

}

export { UserRepository }