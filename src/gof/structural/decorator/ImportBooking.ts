import Usecase from "./Usecase"

export default class ImportBooking implements Usecase {
    constructor(readonly usecase: Usecase){}

    async execute(input: Input): Promise<Output> {
        const output: Output = {
            codes: []
        }
        
        const lines = input.file.split("\n")
        for(const row of lines.slice(1)){
            const [email, checkinDate, checkoutDate, category] = row.split(";")
            const inputUsecase  = {
                email,
                checkinDate: new Date(checkinDate),
                checkoutDate: new Date(checkoutDate),
                category
            }
            const outputUsecase = await this.usecase.execute(inputUsecase )
            output.codes.push(outputUsecase.code)
        }
        
        return output
    }
}

type Input = {
    file: string
}

type Output = {
    codes: string[]
}