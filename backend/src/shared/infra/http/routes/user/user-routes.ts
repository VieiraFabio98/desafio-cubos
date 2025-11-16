import { CreateUserController } from "@modules/user/use-cases/create/create-user-controller"
import { DeleteUserController } from "@modules/user/use-cases/delete/delete-user-controller"
import { GetUserController } from "@modules/user/use-cases/get/get-user-controller"
import { UpdateUserController } from "@modules/user/use-cases/update/update-user-controller"
import { Router } from "express"


const userRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()


userRoutes.post('/', createUserController.handle)
userRoutes.get('/:id', getUserController.handle)
userRoutes.patch('/update-user/:id', updateUserController.handle)
userRoutes.delete('/:id', deleteUserController.handle)

export { userRoutes }