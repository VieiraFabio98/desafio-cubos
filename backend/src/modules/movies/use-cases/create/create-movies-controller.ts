import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateMovieUseCase } from "./create-movies-use-case";


class CreateMovieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId,
      title, 
      originalTitle,
      description, 
      duration, 
      genre, 
      director,  
      releaseDate,
      youtubeUrl
    } = JSON.parse(request.body.data)

    const file: Express.Multer.File = request.file as Express.Multer.File;

    if (!file) {
      throw new Error("File is required");
    }

    const createMovieUseCase = container.resolve(CreateMovieUseCase)

    const result = await createMovieUseCase.execute({
      userId,
      title, 
      originalTitle,
      description,
      duration,
      genre,
      director,
      releaseDate,
      youtubeUrl
    }, {file})

    return response.status(result.statusCode).json(result)

  }
}

export { CreateMovieController }