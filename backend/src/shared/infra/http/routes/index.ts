import { Router } from "express"
import { userRoutes } from "./user/user-routes"
import { authRoutes } from "./auth/auth-routes"

import multerConfig from "../../../../config/multer"
import multer from "multer"
import { UploadImageService } from "@services/upload-image-service"
import { movieRoutes } from "./movies/movie-routes"


const router = Router()

const upload = multer(multerConfig)

router.post('/images', upload.single('image'), async (request, response) => {
  const file = request.file
  const uploadImagesService = new UploadImageService()
  await uploadImagesService.execute(file!)

  return response.send()
})

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/movies', movieRoutes)





export { router }