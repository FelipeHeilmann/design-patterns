import IParkingTicketRepository from "./ParkingTicketRespository"

export default class Checkout {
    constructor(readonly parkingTicketRepository: IParkingTicketRepository) { }

    async execute(input: Input): Promise<Output> {
        const parkingTicket = await this.parkingTicketRepository.getByPlate(input.plate)
        if (!parkingTicket) throw new Error("Parking Ticket not found")
        parkingTicket.checkout(input.checkoutDate)
        await this.parkingTicketRepository.update(parkingTicket)
        return {
            fare: parkingTicket.fare,
            plate: parkingTicket.plate
        }
    }
}


type Input = {
    plate: string,
    checkoutDate: Date,
}

type Output = {
    plate: string,
    fare: number
}