import IUserRepository, { UserRepositoryMemory } from "./UseRepository"

export default class Login {
    userRepository: IUserRepository

    constructor() {
        this.userRepository = UserRepositoryMemory.getInstance()
    }

    async execute(input: Input): Promise<Ouput> {
        const user = await this.userRepository.getByEmail(input.email)
        let success = false
        if(user && user.matchesPassword(input.password)) {
            success = true
        }

        return {
            success
        }
    }
}

type Input = {
    email: string,
    password: string
}

type Ouput = {
    success: boolean
}