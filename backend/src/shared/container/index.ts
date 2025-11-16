import { AuthRepository } from "@modules/auth/domain/repository/auth-repository"
import { MovieRepository } from "@modules/movies/domain/repository/movie-repository"
import { UserRepository } from "@modules/user/domain/repository/user-repository"
import { EmailService } from "@services/mail-service"
import { UploadImageService } from "@services/upload-image-service"
import { container } from "tsyringe"

container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('AuthRepository', AuthRepository)
container.registerSingleton('MovieRepository', MovieRepository)
container.registerSingleton('UploadImageService', UploadImageService)
container.registerSingleton('EmailService', EmailService)