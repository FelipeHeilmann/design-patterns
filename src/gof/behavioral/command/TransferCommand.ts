import BankAccount from "./BankAccount"
import ICommand from "./Command"

export default class TransferCommand implements ICommand {
    constructor(readonly from: BankAccount, readonly to: BankAccount, readonly amount: number) { }

    execute(): void {
        this.from.debit(this.amount)
        this.to.credit(this.amount)
    }
}