import { SACInstallmentCalculator } from "./InstallmentCalculator"
import IInstallmentRepository from "./InstallmentRepository"
import { MortgageLoan } from "./Loan"
import ILoanFactory, { LoanFactoryFactory } from "./LoanFactory"
import ILoanRepository from "./LoanRepository"
import IRepositoryFactory from "./RepositoryFactory"

export default class ApplyForLoan {
    loanRepository: ILoanRepository
    installmentRepository: IInstallmentRepository

    constructor(readonly repositoryFactory: IRepositoryFactory) {
        this.installmentRepository = repositoryFactory.createInstallmentRepository()
        this.loanRepository = repositoryFactory.createLoanRepository()
    }

    async execute(input: Input): Promise<Output> {
        const loanFactory = LoanFactoryFactory.create(input.type)
        const loan = loanFactory.createLoan(input.amount, input.income, input.installments)
        const installmentCalculator = loanFactory.createInstallmentCalculator()
        const installments = installmentCalculator.calculate(loan)
        await this.loanRepository.save(loan)
        for(const installment of installments){
            await this.installmentRepository.save(installment)
        }
        return {
            loanId: loan.loanId
        }
    
    }
}

type Input = {
    amount: number,
    income: number,
    installments: number,
    type: string
}

type Output = {
    loanId: string
}