import { AverageRepositoryDatabase } from "../../../../src/gof/behavioral/mediator/AverageRepository"
import CalculateAverage from "../../../../src/gof/behavioral/mediator/CalculateAverage"
import { GetAverage } from "../../../../src/gof/behavioral/mediator/GetAverage"
import { GradeRepositoryDatabase } from "../../../../src/gof/behavioral/mediator/GradeRepository"
import Mediator from "../../../../src/gof/behavioral/mediator/Mediator"
import SaveGrade from "../../../../src/gof/behavioral/mediator/SaveGrade"
import SaveGradeMediator from "../../../../src/gof/behavioral/mediator/SaveGradeMediator"

test('Deve salvar a nota do aluno e calcular a media', async function () {
    const gradeRepository = new GradeRepositoryDatabase()
    const averageRepository = new AverageRepositoryDatabase()
    const studentId = Math.floor(Math.random() * 10000)
    const calculateAverage = new CalculateAverage(gradeRepository, averageRepository)
    const saveGrade = new SaveGrade(gradeRepository, calculateAverage)
    const inputP1 = {
        studentId,
        exam: "P1",
        value: 10
    }
    await saveGrade.execute(inputP1)
    const inputP2 = {
        studentId,
        exam: "P2",
        value: 9
    }
    await saveGrade.execute(inputP2)
    const inputP3 = {
        studentId,
        exam: "P3",
        value: 8
    }
    await saveGrade.execute(inputP3)
    const getAverage = new GetAverage(averageRepository)
    const output = await getAverage.execute(studentId)
    expect(output.average).toBe(9)
})

test.only('Deve salvar a nota do aluno e calcular a média usando mediator', async function () {
    const gradeRepository = new GradeRepositoryDatabase()
    const averageRepository = new AverageRepositoryDatabase()
    const studentId = Math.floor(Math.random() * 10000)
    const mediator = new Mediator()
    const calculateAverage = new CalculateAverage(gradeRepository, averageRepository)
    mediator.register("grade-saved", async function (data: any) {
        await calculateAverage.execute(data.studentId)
    })
    const saveGrade = new SaveGradeMediator(gradeRepository, mediator)
    const inputP1 = {
        studentId,
        exam: "P1",
        value: 10
    }
    await saveGrade.execute(inputP1)
    const inputP2 = {
        studentId,
        exam: "P2",
        value: 9
    }
    await saveGrade.execute(inputP2)
    const inputP3 = {
        studentId,
        exam: "P3",
        value: 8
    }
    await saveGrade.execute(inputP3)
    const getAverage = new GetAverage(averageRepository)
    const output = await getAverage.execute(studentId)
    expect(output.average).toBe(9)
})