import Loan from "./Loan"

export default interface ILoanRepository {
    getById(loanId: string): Promise<Loan>
    save(loan: Loan): Promise<void>
}

export class LoanRepositoryMemory implements ILoanRepository {
    loans: Loan[] 
    private static instance: LoanRepositoryMemory

    static getInstance() {
        if(!LoanRepositoryMemory.instance) {
            LoanRepositoryMemory.instance = new LoanRepositoryMemory()
        }
        return LoanRepositoryMemory.instance
    }

    private constructor() {
        this.loans = []
    }

    async getById(loanId: string): Promise<Loan> {
        const loan = this.loans.find(loan => loan.loanId === loanId)
        if(!loan) throw new Error("Loan not found")
        return loan    
    }

    async save(loan: Loan): Promise<void> {
        this.loans.push(loan)
    }
    
}