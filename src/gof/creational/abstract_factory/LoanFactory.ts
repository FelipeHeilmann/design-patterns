import InstallmentCalculator, { PriceInsallmentCalculator, SACInsallmentCalculator } from "./InstallmentCalculator"
import Loan, { CarLoan, MortgageLoan } from "./Loan"

export default interface ILoanFactory {
    createLoan(amount: number, income: number, installment: number): Loan
    createInstallmentCalculator(): InstallmentCalculator
}


export class MortgageLoanFactory implements ILoanFactory {

    createLoan(amount: number, income: number, installment: number): Loan {
        return MortgageLoan.create(amount, income, installment)
    }

    createInstallmentCalculator(): InstallmentCalculator {
        return new SACInsallmentCalculator()
    }
}

export class CarLoanFactory implements ILoanFactory {

    createLoan(amount: number, income: number, installment: number): Loan {
        return CarLoan.create(amount, income, installment)
    }

    createInstallmentCalculator(): InstallmentCalculator {
        return new PriceInsallmentCalculator()
    }
}

export class LoanFactoryFactory {
    static create(type: string): ILoanFactory {
        if(type === "mortgage") return new MortgageLoanFactory()
        if(type === "car") return new CarLoanFactory()
        throw new Error ("Invalid type")
    }
}
