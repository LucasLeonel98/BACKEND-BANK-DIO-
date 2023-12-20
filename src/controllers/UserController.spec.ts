import { IUser, UserService } from "../services/UserServices"
import { UserController } from "./UserController"
import { makeRequest } from "../__mocks__/mockRequest.mock"
import { makeResponse } from "../__mocks__/mockResponse.mock"
import { Request } from 'express'



describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn(),
    }
    const userController = new UserController(mockUserService as UserService)




    it('Insere novo usuario', () => {
        const mockRequest = {
            body: {
                name: 'lucas',
                email: 'lucas@test.com'
            }
        } as Request
        const mockResponse = makeResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuario criado com sucesso !' })
    })

    it('Deletar usuario', () => {
        const mockRequest = {
            body: {
                name: 'lucas',
                email: 'lucas@test.com'
            }
        } as Request
        const mockResponse = makeResponse()
        if (!userController.deleteUser(mockRequest, mockResponse)) {
            expect(mockResponse.state.status).toBe(201)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuario deletado com sucesso !' })
        } else {
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, Usuario não encontrado !' })
        }

    })

    it('Deletar usuario inexistente', () => {
        const mockRequest = {
            body: {
                name: 'lucas',
                email: 'lucas@t'
            }
        } as Request
        const mockResponse = makeResponse()
        if (!userController.deleteUser(mockRequest, mockResponse)) {
            expect(mockResponse.state.status).toBe(201)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuario deletado com sucesso !' })
        } else {
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, Usuario não encontrado !' })
        }

    })

    it('Erro usuario sem nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'lucas@test.com'
            }
        } as Request
        const mockResponse = makeResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, campo nome inválido' })
    })

    it('Erro usuario sem email', () => {
        const mockRequest = {
            body: {
                name: 'lucas',
                email: ''
            }
        } as Request
        const mockResponse = makeResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, campo email inválido' })
    })

    it('Erro deletar usuario sem nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'lucas@test.com'
            }
        } as Request
        const mockResponse = makeResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, campo nome inválido' })
    })

    it('Erro deletar usuario sem email', () => {
        const mockRequest = {
            body: {
                name: 'lucas',
                email: ''
            }
        } as Request
        const mockResponse = makeResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request, campo email inválido' })
    })

    it('Listar usuarios', () => {
        const mockRequest = {} as Request
        const mockResponse = makeResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).not.toBeNull()
    })


})