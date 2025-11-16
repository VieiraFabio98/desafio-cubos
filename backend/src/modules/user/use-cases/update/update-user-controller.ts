import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UpdateUserUseCase } from "./update-user-use-case";


@injectable()
class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email } = request.body

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const result = await updateUserUseCase.execute({
      id,
      name,
      email,
    })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateUserController }