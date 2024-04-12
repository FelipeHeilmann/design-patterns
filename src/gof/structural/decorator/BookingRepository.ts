import Booking from "./Booking"
import pgp from "pg-promise"

export default interface IBookingRepository {
    getBookingByCode(code: string): Promise<Booking>
    save(booking: Booking): Promise<void>
    update(booking: Booking): Promise<void>
}

export class BookingRepositoryDatabase implements IBookingRepository {
    
    async getBookingByCode(code: string): Promise<Booking> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        const [bookinData] = await connection.query("select * from design_patterns.booking where code = $1", [code])
        await connection.$pool.end()
        return new Booking(bookinData.code, bookinData.room_id, bookinData.email, bookinData.checkin_date, bookinData.checkout_date, parseFloat(bookinData.duration), parseFloat(bookinData.price), bookinData.status)
    }

    async save(booking: Booking): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query(`insert into design_patterns.booking
        (code, room_id, email, checkin_date, checkout_date, duration, price, status)
        values ($1, $2, $3, $4, $5, $6, $7, $8)`,[booking.code, booking.roomId, booking.email, booking.checkinDate, booking.checkoutDate, booking.duration, booking.price, booking.getStatus()])
        await connection.$pool.end()
    }

    async update(booking: Booking): Promise<void> {
        const connection = pgp()("postgres://postgres:postgres@localhost:5432/branas")
        await connection.query("update design_patterns.booking set status = $1 where code = $2", [booking.getStatus(), booking.code])
        await connection.$pool.end()
    }
}