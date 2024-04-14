import InstallmentCalculator, { PriceInstallmentCalculator, SACInstallmentCalculator } from "./InstallmentCalculator"
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
        return new SACInstallmentCalculator()
    }
}

export class CarLoanFactory implements ILoanFactory {

    createLoan(amount: number, income: number, installment: number): Loan {
        return CarLoan.create(amount, income, installment)
    }

    createInstallmentCalculator(): InstallmentCalculator {
        return new PriceInstallmentCalculator()
    }
}

export class LoanFactoryFactory {
    static create(type: string): ILoanFactory {
        if(type === "mortgage") return new MortgageLoanFactory()
        if(type === "car") return new CarLoanFactory()
        throw new Error ("Invalid type")
    }
}
