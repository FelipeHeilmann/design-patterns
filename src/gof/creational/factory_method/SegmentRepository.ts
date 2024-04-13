import Segment from "./Segment"

export default interface ISegmentRepository {
    listByRideId(rideId: string): Promise<Segment[]>
    save(segment: Segment): Promise<void>
}

export class SegmentRepositoryMemory implements ISegmentRepository {
    segments: Segment[]

    constructor() {
        this.segments = []
    }

    async listByRideId(rideId: string): Promise<Segment[]> {
        return this.segments.filter(segment => segment.rideId === rideId)
    }

    async save(segment: Segment): Promise<void> {
        this.segments.push(segment)
    }
}