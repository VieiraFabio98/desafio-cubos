import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { DeleteUserUseCase } from "./delete-user-use-case";


@injectable()
class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    const result = await deleteUserUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteUserController }