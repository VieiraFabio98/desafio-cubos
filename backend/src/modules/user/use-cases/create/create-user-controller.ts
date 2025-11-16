import { Request, Response } from "express"
import { container, injectable } from "tsyringe"
import { CreateUserUseCase } from "./create-user-use-case"


class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const result = await createUserUseCase.execute({ name, email, password })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUserController }