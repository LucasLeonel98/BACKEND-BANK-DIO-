export interface IUser {
    name: string,
    email: string
}

const db = [
    {
        name: "lucas teste",
        email: "lucas@dio.bank"
    }
]

export class UserService {
    db: IUser[]

    constructor(
        database = db
    ) {
        this.db = database
    }
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log('DB Atualizado', this.db)
    }
    deleteUser = (name: string, email: string): boolean => {

        const user = {
            name,
            email
        }
        const userIndex = this.db.findIndex(object => {
            return object.name === user.name && object.email === user.email;
        });


        if (userIndex > -1) {
            this.db.splice(userIndex, 1)
            console.log('DB Atualizado', this.db)
            return true
        }
        return false

    }
    getAllUsers = () => {
        return this.db
    }
}