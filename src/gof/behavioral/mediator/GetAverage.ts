import IAverageRepository from "./AverageRepository"

export class GetAverage {
    constructor(readonly averageRepository: IAverageRepository) { }

    async execute(studentId: number): Promise<Output> {
        const average = await this.averageRepository.get(studentId)
        return {
            average: average.value
        }
    }
}

type Output = {
    average: number
}