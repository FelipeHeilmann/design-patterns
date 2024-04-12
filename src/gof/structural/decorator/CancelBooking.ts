import IBookingRepository from "./BookingRepository";

export default class CancelBooking {
    constructor(readonly bookingRepository: IBookingRepository){}

    async execute(input: Input): Promise<void> {
        const booking = await this.bookingRepository.getBookingByCode(input.code)
        booking.cancel()
        await this.bookingRepository.update(booking)
    }
}

type Input = {
    code: string
}