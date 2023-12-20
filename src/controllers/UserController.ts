import { Request, Response } from 'express'
import { UserService } from '../services/UserServices'

export class UserController {
    userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }
    createUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name) {
            return response.status(400).json({ message: 'Bad request, campo nome inválido' })
        }
        if (!user.email) {
            return response.status(400).json({ message: 'Bad request, campo email inválido' })
        }
        this.userService.createUser(user.name, user.email)

        return response.status(201).json({ message: 'Usuario criado com sucesso !' })
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        console.log('Usuario deletar controller', user)
        if (!user.name) {
            return response.status(400).json({ message: 'Bad request, campo nome inválido' })
        }
        if (!user.email) {
            return response.status(400).json({ message: 'Bad request, campo email inválido' })
        }
        if (this.userService.deleteUser(user.name, user.email)) {
            return response.status(201).json({ message: 'Usuario deletado com sucesso !' })
        }

        return response.status(400).json({ message: 'Bad request, Usuario não encontrado !' })


    }

    getAllUsers = (request: Request, response: Response) => {

        const users = this.userService.getAllUsers()

        return response.status(200).json(users)

    }

}