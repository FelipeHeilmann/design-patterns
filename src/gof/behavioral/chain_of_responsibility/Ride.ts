import FareCalculator from "./FareCalculator"
import Segment from "./Segment"

export default class Ride {
    private fare: number
    private segments: Segment[]

    constructor(readonly fareCalculator: FareCalculator) {
        this.fare = 0
        this.segments = []
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date))
    }

    calculate() {
        for (const segment of this.segments) {
            this.fare += this.fareCalculator.calcualte(segment)
        }

        this.fare = (this.fare < 10) ? 10 : this.fare
    }

    getFare() {
        return this.fare
    }
}