export default class Transaction {
    constructor(readonly type: "debit" | "credit", readonly amount: number) { }
}