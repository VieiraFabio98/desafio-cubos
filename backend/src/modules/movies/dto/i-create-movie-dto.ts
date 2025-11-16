import { User } from "@modules/user/domain/entities/user"

interface ICreateMovieDTO {
  user?: User 
  userId?: string
  title: string
  originalTitle: string
  description: string
  duration: string
  genre: string
  posterUrl?: string
  youtubeUrl: string
  director: string
  releaseDate: string
}

export { ICreateMovieDTO }