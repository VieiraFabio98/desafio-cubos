import { AuthController } from "@modules/auth/use-cases/auth-controller"
import { Router } from "express"


const authRoutes = Router()

const authController = new AuthController()

authRoutes.post('/', authController.handle)

export { authRoutes }