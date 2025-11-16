import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMovieUseCase } from "./list-movie-use-case";


class ListMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      order,
      filter
    } = request.body

    const listMovieUseCase = container.resolve(ListMovieUseCase)

    const result = await listMovieUseCase.execute({
      search: search || "",
      page: page || 0,
      order: order || "",
      filter: filter || ''
    })

    return response.status(result.statusCode).json(result)
  }
}

export { ListMovieController }