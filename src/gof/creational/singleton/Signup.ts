import IUserRepository, { UserRepositoryMemory } from "./UseRepository"
import User from "./User"

export default class Signup {
    userRepository: IUserRepository


    constructor() {
        this.userRepository = UserRepositoryMemory.getInstance()
    }

    async execute(input: Input): Promise<void> {
        const user = User.create(input.name, input.email, input.password)
        await this.userRepository.save(user)
    }
}

type Input = {
    name: string,
    email: string,
    password: string
}