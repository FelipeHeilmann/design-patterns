import pgp from "pg-promise"
import Average from "./Average"

export default interface IAverageRepository {
    save(average: Average): Promise<void>
    get(studentId: number): Promise<Average>
}

export class AverageRepositoryDatabase implements IAverageRepository {
    async save(average: Average): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query("delete from design_patterns.average where student_id = $1", [average.studentId])
        await connection.query("insert into design_patterns.average (student_id, value) values ($1, $2)", [average.studentId, average.value])
        await connection.$pool.end()
    }
    async get(studentId: number): Promise<Average> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        const [averageData] = await connection.query("select * from design_patterns.average where student_id = $1", [studentId])
        await connection.$pool.end()
        const average = new Average(averageData.student_id, parseFloat(averageData.value))
        return average
    }
}