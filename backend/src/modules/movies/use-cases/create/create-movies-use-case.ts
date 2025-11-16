import { MovieRepository } from "@modules/movies/domain/repository/movie-repository";
import { ICreateMovieDTO } from "@modules/movies/dto/i-create-movie-dto";
import { IUploadImageDTO } from "@modules/movies/dto/i-upload-image-dto";
import { UserRepository } from "@modules/user/domain/repository/user-repository";
import { EmailService } from "@services/mail-service";
import { UploadImageService } from "@services/upload-image-service";
import { conflictError, created, HttpResponse, notFound, serverError } from "@shared/helpers";
import appDataSource from "@shared/infra/database/data-source";
import { S3Storage } from "@utils/s3-storage";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateMovieUseCase {
  constructor(
    @inject('MovieRepository')
    private movieRepository: MovieRepository,
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('UploadImageService')
    private uploadmageService: UploadImageService,
    @inject('EmailService')
    private emailService: EmailService
  ){}

  async execute({
    userId,
    title, 
    originalTitle,
    description, 
    duration, 
    genre, 
    director,  
    releaseDate,
    youtubeUrl
  }: ICreateMovieDTO, {file}: IUploadImageDTO): Promise<HttpResponse> {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    try {

      if(!userId){
        return conflictError('userId required')
      }

      const user = await this.userRepository.get(userId)

      if(!user) {
        return notFound('User not found')
      }

      const posterUrl = await this.uploadmageService.execute(file)
      if(!posterUrl) {
        throw new Error("Error uploading image")
      }

      const movie = await this.movieRepository.create({
        user,
        title, 
        originalTitle,
        description, 
        duration,
        genre,
        director,
        posterUrl: posterUrl,
        releaseDate,
        youtubeUrl
      }, queryRunner)

      const today = new Date().toLocaleDateString('pt-Br')
      const release = releaseDate

      if (release > today) {
        await this.emailService.send({
          to: user.email,
          subject: `Filme "${title}" será lançado em breve!`,
          body: `Olá ${user.name}, o filme "${title}" será lançado em ${release}. Fique ligado!`,
        });
      }

      await queryRunner.commitTransaction()

      return created(movie)

    } catch(error) {
      await queryRunner.rollbackTransaction()
      return serverError(error as Error)
    }finally {
      await queryRunner.release()
    }
  }
}

export { CreateMovieUseCase }