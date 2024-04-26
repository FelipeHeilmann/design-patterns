import FlightTicket from "./FlightTicket"

export default class FlightTicketBuilder {
    airline!: string
    fromAirport!: string
    toAirport!: string
    flightCode!: string
    passengerName!: string
    passengerEmail!: string
    passengerDocument!: string
    passengerGender!: string
    emergencyContactName!: string
    emergencyContactTelephone!: string
    seat!: string
    checkedBags!: number
    hasChecking!: boolean
    terminal!: string
    gate!: string 
    priority!: number

    setFlight(airline: string, flightCode: string) {
        this.airline = airline
        this.flightCode = flightCode
        return this
    }

    setTrip(from: string, to: string) {
        this.fromAirport = from
        this.toAirport = to
        return this
    }

    setPassenger(name: string, email: string, document: string, gender: string) {
        this.passengerName = name
        this.passengerEmail = email
        this.passengerDocument = document
        this.passengerGender = gender
        return this
    }

    setEmergencyContact(name: string, telephone: string) {
        this.emergencyContactName = name
        this.emergencyContactTelephone = telephone
        return this
    }

    setSeat(seat: string) {
        this.seat = seat
        return this
    }

    setCheckedBags(checkedBags: number) {
        this.checkedBags = checkedBags
        return this
    }

    setCheckinInformation(hasChecking: boolean, terminal: string, gate: string) {
        this.hasChecking = hasChecking
        this.terminal = terminal
        this.gate = gate
        return this
    }

    setPriority(priority: number) {
        this.priority = priority
        return this
    }

    getFlightTicket() {
        return new FlightTicket(this)
    }
}