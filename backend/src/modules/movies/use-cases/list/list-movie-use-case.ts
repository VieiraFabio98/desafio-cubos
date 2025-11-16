import { MovieRepository } from "@modules/movies/domain/repository/movie-repository";
import { IListMovieRequest } from "@modules/movies/dto/i-list-movie-request-dto";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";



@injectable()
class ListMovieUseCase {
  constructor(
    @inject('MovieRepository')
    private movieRepository: MovieRepository
  ){}

  async execute({
    search,
    filter,
    order,
    page
  }: IListMovieRequest): Promise<HttpResponse> {
    try {
      const movies = await this.movieRepository.list({
        search,
        filter,
        order,
        page
      })

      return ok(movies)
    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { ListMovieUseCase }