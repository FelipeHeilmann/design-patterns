import { NormalFareCalculator, OvernightFareCalculator, OvernightSundayFareCalculator, SundayFareCalculator } from "../../../../src/gof/behavioral/chain_of_responsibility/FareCalculator"
import Ride from "../../../../src/gof/behavioral/chain_of_responsibility/Ride"

let ride: Ride

beforeEach(() => {
    const overnightSundayFareCalculator = new OvernightSundayFareCalculator()
    const sundayFareCalculator = new SundayFareCalculator(overnightSundayFareCalculator)
    const overnightFareCalculator = new OvernightFareCalculator(sundayFareCalculator)
    const normalFareCalculator = new NormalFareCalculator(overnightFareCalculator)
    ride = new Ride(normalFareCalculator)
})

test("Deve calcular o valor da corrida no horário normal", function () {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"))
    ride.calculate()
    expect(ride.getFare()).toBe(21)
})

test("Deve calcular o valor da corrida no horário norturno", function () {
    ride.addSegment(10, new Date("2021-03-01T23:00:00"))
    ride.calculate()
    expect(ride.getFare()).toBe(39)
})

test("Deve calcular o valor da corrida no horário de domingo", function () {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"))
    ride.calculate()
    expect(ride.getFare()).toBe(29)
})

test("Deve calcular o valor da corrida no horário de domingo a noite", function () {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"))
    ride.calculate()
    expect(ride.getFare()).toBe(50)
})

test("Não deve calcular o valor da corrida para uma data inválida", function () {
    expect(() => ride.addSegment(10, new Date("jonas-furtado"))).toThrow(new Error("Invalid date"))
})

test("Não deve calcular o valor da corrida para uma distancia inválida", function () {
    expect(() => ride.addSegment(-10, new Date("2021-03-07T23:00:00"))).toThrow(new Error("Invalid distance"))
})

