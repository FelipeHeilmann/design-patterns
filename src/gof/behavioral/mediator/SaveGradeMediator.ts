import Grade from "./Grade"
import IGradeRepository from "./GradeRepository"
import Mediator from "./Mediator"

export default class SaveGradeMediator {
    constructor(readonly gradeRepository: IGradeRepository, readonly mediator: Mediator) { }

    async execute(input: Input): Promise<void> {
        const grade = new Grade(input.studentId, input.exam, input.value)
        await this.gradeRepository.save(grade)
        await this.mediator.notify("grade-saved", { studentId: input.studentId })
    }
}

type Input = {
    studentId: number,
    exam: string,
    value: number
}