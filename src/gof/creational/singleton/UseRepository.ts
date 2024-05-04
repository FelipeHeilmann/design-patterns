import User from "./User"

export default interface IUserRepository {
    save(user: User): Promise<void>
    getByEmail(email: string): Promise<User | undefined>
}

export class UserRepositoryMemory implements IUserRepository {
    private users: User[]
    static instance: UserRepositoryMemory 

    private constructor() {
        this.users = []
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async getByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email)
        return user
    }

    static getInstance() {
        if(!UserRepositoryMemory.instance) {
            UserRepositoryMemory.instance = new UserRepositoryMemory()
        }
        return UserRepositoryMemory.instance
    }
}

