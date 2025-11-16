import { Request, Response } from "express"
import { container, injectable } from "tsyringe"
import { AuthUseCase } from "./auth-use-case"


class AuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userIdentifier, password } = request.body

    const authUseCase = container.resolve(AuthUseCase)

    const result = await authUseCase.execute({ userIdentifier, password })

    return response.status(result.statusCode).json(result)
  }
}

export { AuthController }