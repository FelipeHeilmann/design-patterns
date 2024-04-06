import Segment from "./Segment"

export default interface FareCalculator {
    next?: FareCalculator
    calcualte(segment: Segment): number
}

export class NormalFareCalculator implements FareCalculator {
    FARE = 2.1

    constructor(readonly next?: FareCalculator) { }

    calcualte(segment: Segment): number {
        if (!segment.isSunday() && !segment.isOvernight()) {
            return segment.distance * this.FARE
        }
        if (!this.next) throw new Error()
        return this.next.calcualte(segment)
    }
}

export class OvernightFareCalculator implements FareCalculator {
    FARE = 3.9

    constructor(readonly next?: FareCalculator) { }

    calcualte(segment: Segment): number {
        if (!segment.isSunday() && segment.isOvernight()) {
            return segment.distance * this.FARE
        }
        if (!this.next) throw new Error()
        return this.next.calcualte(segment)
    }
}

export class SundayFareCalculator implements FareCalculator{
    FARE = 2.9

    constructor(readonly next?: FareCalculator) { }

    calcualte(segment: Segment): number {
        if (segment.isSunday() && !segment.isOvernight()) {
            return segment.distance * this.FARE
        }
        if (!this.next) throw new Error()
        return this.next.calcualte(segment)
    }
}

export class OvernightSundayFareCalculator implements FareCalculator{
    FARE = 5

    constructor(readonly next?: FareCalculator) { }

    calcualte(segment: Segment): number {
        if (segment.isSunday() && segment.isOvernight()) {
            return segment.distance * this.FARE
        }
        if (!this.next) throw new Error()
        return this.next.calcualte(segment)
    }
}