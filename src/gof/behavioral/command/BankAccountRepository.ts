import BankAccount from "./BankAccount";

export default interface IBankAccountRepository {
    save(bankAccount: BankAccount): Promise<void>
    update(bankAccount: BankAccount): Promise<void>
    getById(bankAccountId: number): Promise<BankAccount>
}

export class BankRepositoryMemory implements IBankAccountRepository {
    bankAccounts: BankAccount[]

    constructor() {
        this.bankAccounts = []
    }

    async save(bankAccount: BankAccount): Promise<void> {
        this.bankAccounts.push(bankAccount)
    }

    async update(bankAccount: BankAccount): Promise<void> {
        const index = this.bankAccounts.findIndex(existBankAccount => existBankAccount.bankAccountId === bankAccount.bankAccountId)
        this.bankAccounts.slice(index)
    }

    async getById(bankAccountId: number): Promise<BankAccount> {
        const bankAccount = this.bankAccounts.find(bankAccount => bankAccount.bankAccountId === bankAccountId)
        if (!bankAccount) throw new Error("Bank account not found")
        return bankAccount
    }


}