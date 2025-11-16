import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { GetUserUseCase } from "./get-user-use-case";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getUserUseCase = container.resolve(GetUserUseCase)

    const result = await getUserUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetUserController }