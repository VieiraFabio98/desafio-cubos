import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetMovieUseCase } from "./get-movie-seu-case";


class GetMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getmovieUseCase = container.resolve(GetMovieUseCase)

    const result = await getmovieUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetMovieController }