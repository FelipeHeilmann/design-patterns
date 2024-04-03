import Average from "./Average"
import IAverageRepository from "./AverageRepository"
import IGradeRepository from "./GradeRepository"

export default class CalculateAverage {
    constructor(readonly gradeRepository: IGradeRepository, readonly averageRepository: IAverageRepository) { }

    async execute(studentId: number) {
        let total = 0
        const grades = await this.gradeRepository.listByStudentId(studentId)
        for (const grade of grades) {
            total += grade.value
        }
        const value = total / grades.length
        const average = new Average(studentId, value)
        await this.averageRepository.save(average)
    }
}