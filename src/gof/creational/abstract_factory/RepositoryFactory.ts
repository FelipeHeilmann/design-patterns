import IInstallmentRepository, { InstallmentRepositoryMemory } from "./InstallmentRepository";
import ILoanRepository, { LoanRepositoryMemory } from "./LoanRepository";

export default interface IRepositoryFactory {
    createLoanRepository(): ILoanRepository
    createInstallmentRepository() : IInstallmentRepository
}

export class RepositoryMemoryFactory implements IRepositoryFactory {

    createLoanRepository(): ILoanRepository {
        return LoanRepositoryMemory.getInstance()
    }
    createInstallmentRepository(): IInstallmentRepository {
        return InstallmentRepositoryMemory.getInstance()
    }

}