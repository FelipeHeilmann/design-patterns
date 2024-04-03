import ParkingTicket from "./ParkingTicket"
import pgp from "pg-promise"

export default interface IParkingTicketRepository {
    getByPlate(plate: string): Promise<ParkingTicket | null>
    save(parkinTicket: ParkingTicket): Promise<void>
    update(parkinTicket: ParkingTicket): Promise<void>
}


export class ParkingTicketRepositoryDatabase implements IParkingTicketRepository {

    async getByPlate(plate: string): Promise<ParkingTicket | null> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        const [parkinTicketData] = await connection.query("select * from design_patterns.parking_ticket where plate = $1", [plate])
        await connection.$pool.end()
        if (!parkinTicketData) return null
        return new ParkingTicket(parkinTicketData.plate, parkinTicketData.checkin_date, parkinTicketData.location)
    }

    async save(parkinTicket: ParkingTicket): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query("insert into design_patterns.parking_ticket (plate, checkin_date, location, fare) values ($1, $2, $3, $4)", [parkinTicket.plate, parkinTicket.checkinDate, parkinTicket.location, parkinTicket.fare])
        await connection.$pool.end()
    }

    async update(parkinTicket: ParkingTicket): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query("update design_patterns.parking_ticket set checkout_date = $1, fare = $2 where plate = $3", [parkinTicket.checkinDate, parkinTicket.fare, parkinTicket.plate])
        await connection.$pool.end()
    }

}