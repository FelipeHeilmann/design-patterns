import Installment from "./Installment";

export default interface IInstallmentRepository {
    getByLoanId(loanId: string): Promise<Installment[]>
    save(installment: Installment): Promise<void>
}

export class InstallmentRepositoryMemory implements IInstallmentRepository {
    installments: Installment[]
    private static instance: InstallmentRepositoryMemory

    private constructor() {
        this.installments = []
    }

    static getInstance() {
        if(!InstallmentRepositoryMemory.instance) {
            InstallmentRepositoryMemory.instance = new InstallmentRepositoryMemory()
        }
        return InstallmentRepositoryMemory.instance
    }

    async getByLoanId(loanId: string): Promise<Installment[]> {
        return this.installments.filter(installment => installment.loanId === loanId)
    }

    async save(installment: Installment): Promise<void> {
       this.installments.push(installment)
    }
}