import pgp from "pg-promise"
import Grade from "./Grade"

export default interface IGradeRepository {
    save(grade: Grade): Promise<void>
    listByStudentId(studentId: number): Promise<Grade[]>
}

export class GradeRepositoryDatabase implements IGradeRepository {
    async save(grade: Grade): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query("insert into design_patterns.grade (student_id, exam, value) values ($1, $2, $3)", [grade.studentId, grade.exam, grade.value])
        await connection.$pool.end()
    }
    async listByStudentId(studentId: number): Promise<Grade[]> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        const gradesData = await connection.query("select * from design_patterns.grade where student_id = $1", [studentId])
        await connection.$pool.end()
        const grades = []
        for (const gradeData of gradesData) {
            grades.push(new Grade(gradeData.student_id, gradeData.exam, parseFloat(gradeData.value)))
        }
        return grades
    }
}