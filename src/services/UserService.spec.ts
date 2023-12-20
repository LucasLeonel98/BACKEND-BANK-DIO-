import { IUser, UserService } from "./UserServices"


describe('UserService', () => {
    const mockDb: IUser[] = []
    const userService = new UserService(mockDb)
    const mockConsole = jest.spyOn(global.console, 'log')

    it('Criar novo  usuario', () => {
        userService.createUser('lucas', 'lucas@test.com')
        expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
    })

    it('Apagar usuario', () => {
        if (userService.deleteUser('lucas', 'lucas@dio.bank')) {
            expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
        }
        else {
            expect(mockConsole).not.toHaveBeenCalledWith('DB Atualizado', mockDb)
        }

    })
})