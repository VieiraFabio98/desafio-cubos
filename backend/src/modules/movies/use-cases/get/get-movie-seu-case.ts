import { MovieRepository } from "@modules/movies/domain/repository/movie-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class GetMovieUseCase {
  constructor(
    @inject('MovieRepository')
    private movieRepository: MovieRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    try {

      const movie = await this.movieRepository.get(id)

      return ok(movie)

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { GetMovieUseCase }