import ParkingTicket from "./ParkingTicket"
import IParkingTicketRepository from "./ParkingTicketRespository"

export default class Checkin {

    constructor(readonly parkinTicketRepository: IParkingTicketRepository) { }

    async execute(input: Input): Promise<void> {
        const existPlate = await this.parkinTicketRepository.getByPlate(input.plate)
        if (existPlate) throw new Error("Duplicated plate")
        const parkinTicket = new ParkingTicket(input.plate, input.checkinDate, input.location)
        await this.parkinTicketRepository.save(parkinTicket)
    }
}

type Input = {
    plate: string,
    checkinDate: Date,
    location: string
}