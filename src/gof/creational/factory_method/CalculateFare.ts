import IRideRepository from "./RideRepository"
import ISegmentRepository from "./SegmentRepository"

export default class CalculateFare {
    constructor(readonly rideRepository: IRideRepository, readonly segmentRepository: ISegmentRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const ride = await this.rideRepository.getById(input.rideId)
        const segments = await this.segmentRepository.listByRideId(input.rideId)
        const fare = ride.calculateFare(segments)
        return {
            fare
        }
    }
}

type Input = {
    rideId: string,
}

type Output = {
    fare: number
}