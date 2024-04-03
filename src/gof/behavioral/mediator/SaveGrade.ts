import CalculateAverage from "./CalculateAverage"
import Grade from "./Grade"
import IGradeRepository from "./GradeRepository"

export default class SaveGrade {
    constructor(readonly gradeRepository: IGradeRepository, readonly calculateAverage: CalculateAverage) { }

    async execute(input: Input): Promise<void> {
        const grade = new Grade(input.studentId, input.exam, input.value)
        await this.gradeRepository.save(grade)
        await this.calculateAverage.execute(input.studentId)
    }
}

type Input = {
    studentId: number,
    exam: string,
    value: number
}