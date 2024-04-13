import { CarLoan, MortgageLoan } from "../../../../src/gof/creational/abstract_factory/Loan"

test("Deve criar um financiamento imobiliário", function() {
    const amount = 100_000
    const income = 10_000
    const installments = 240
    const loan = MortgageLoan.create(amount, income, installments)
    expect(loan.loanId).toBeDefined()
    expect(loan.amount).toBe(100000)
    expect(loan.income).toBe(10000)
    expect(loan.installments).toBe(240)
})

test("Não deve criar um financiamento imobiliário com prazo superior a 420 meses", function() {
    const amount = 100_000
    const income = 10_000
    const installments = 450
    expect(() => MortgageLoan.create(amount, income, installments)).toThrow(new Error("The maximum number of installments for mortgage loan is 420"))
})

test("Não deve criar um financiamento imobiliário com parcela superior a 25% da renda mensal", function() {
    const amount = 200_000
    const income = 1_000
    const installments = 240
    expect(() => MortgageLoan.create(amount, income, installments)).toThrow(new Error("The installment amount could not exceed 25% of monthly income"))
})

test("Não deve criar um financiamento veicular com prazo superior a 60 meses", function() {
    const amount = 100_000
    const income = 10_000
    const installments = 72
    expect(() => CarLoan.create(amount, income, installments)).toThrow(new Error("The maximum number of installments for car loan is 60"))
})

test("Não deve criar um financiamento veicular com parcela superior a 30% da renda mensal", function() {
    const amount = 200_000
    const income = 1_000
    const installments = 60
    expect(() => CarLoan.create(amount, income, installments)).toThrow(new Error("The installment amount could not exceed 30% of monthly income"))
})