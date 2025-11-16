import { Brackets, ILike, QueryRunner, Repository } from "typeorm"
import { Movie } from "../entities/movie"
import appDataSource from "@shared/infra/database/data-source"
import { ICreateMovieDTO } from "@modules/movies/dto/i-create-movie-dto"
import { IListMovieRequest } from "@modules/movies/dto/i-list-movie-request-dto"


class MovieRepository {
  private repository: Repository<Movie>

  constructor() {
    this.repository = appDataSource.getRepository(Movie)
  }

  async create(data: ICreateMovieDTO, queryRunner: QueryRunner): Promise<Movie> {
    try {
      const movie = this.repository.create(data)

      const result = await queryRunner.manager.save(movie)

      return result
      
    }catch(error) {
      throw error 
    }
  }

  async get(id: string): Promise<Movie | null> {
    try {
      const movie = await this.repository.findOne({
        where: { id }
      })


      return movie

    }catch(error) {
      throw error
    }
  }

  async list({
    filter,
    order,
    page,
    search
  }: IListMovieRequest): Promise<{ items: Movie[], hasNext: boolean }> {
    try {
  
      // Paginação
      const limit = 12
      const offset = (page ?? 0) * limit
  
      // Query básica
      let query = this.repository.createQueryBuilder("mov")
        .select([
          'mov.id as "id"',
          'mov.title as "title"',
          'mov.originalTitle as "originalTitle"',
          'mov.description as "description"',
          'mov.genre as "genre"',
          'mov.duration as "duration"',
          'mov.director as "director"',
          'mov.posterUrl as "posterUrl"'
        ])
  
      // FILTRO
      if (filter) {
        query = query.where(filter)
      }
  
      // SEARCH
      if (search) {
        query = query.andWhere(new Brackets(q => {
          q.where('mov.title ILIKE :search', { search: `%${search}%` })
           .orWhere('mov.originalTitle ILIKE :search', { search: `%${search}%` })
           .orWhere('mov.director ILIKE :search', { search: `%${search}%` })
           .orWhere('mov.genre ILIKE :search', { search: `%${search}%` })
        }))
      }
  
      const rows = await query
      .offset(offset)
      .limit(limit + 1)   // Fetch 12 + 1
      .getRawMany()

      const hasNext = rows.length > limit

      const items = hasNext ? rows.slice(0, limit) : rows
  
      return {
        items: items,
        hasNext: hasNext
      }
  
    } catch (error) {
      throw error
    }
  }
  
  
}

export { MovieRepository }
