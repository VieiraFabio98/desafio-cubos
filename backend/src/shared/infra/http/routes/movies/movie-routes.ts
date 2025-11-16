
import { CreateMovieController } from "@modules/movies/use-cases/create/create-movies-controller"
import { Router } from "express"
import multer from "multer"
import multerConfig from "../../../../../config/multer"
import { GetMovieController } from "@modules/movies/use-cases/get/get-movie-controller"
import { ListMovieController } from "@modules/movies/use-cases/list/list-movie-controller"


const movieRoutes = Router()
const upload = multer(multerConfig)

const createMovieController = new CreateMovieController()
const getMovieController = new GetMovieController()
const listMovieController = new ListMovieController()

movieRoutes.post('/', upload.single('image'), createMovieController.handle)
movieRoutes.post('/list', listMovieController.handle)
movieRoutes.get('/:id', getMovieController.handle)


export { movieRoutes }