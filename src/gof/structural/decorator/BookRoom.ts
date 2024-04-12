import Booking from "./Booking"
import IBookingRepository from "./BookingRepository"
import IRoomRepository from "./RoomRepository"
import Usecase from "./Usecase"

export default class BookRoom implements Usecase {
    constructor(readonly roomRepository: IRoomRepository, readonly bookingRepository: IBookingRepository){}

    async execute(input: Input): Promise<Output> {
        const [avaliableRoom] = await this.roomRepository.getAvailableRoomsByPeriodAndCategory(input.checkinDate, input.checkoutDate, input.category)
        if(!avaliableRoom) throw new Error("Room is not avaliable")
        const booking = Booking.create(input.email, avaliableRoom, input.checkinDate, input.checkoutDate)
        await this.bookingRepository.save(booking)
        return {
            code: booking.code
        }
    }
}

type Input = {
    email: string,
    checkinDate: Date,
    checkoutDate: Date,
    category: string
}

type Output = {
    code: string
}