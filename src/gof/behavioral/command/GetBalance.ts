import IBankAccountRepository from "./BankAccountRepository"

export default class GetBalance {
    constructor(readonly bankAccountRepository: IBankAccountRepository) { }

    async execute(bankAccountId: number) {
        const account = await this.bankAccountRepository.getById(bankAccountId)
        return {
            balance: account.getBalance()
        }
    }
}

type Output = {
    balance: number
}
