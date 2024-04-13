import Location from "./Location"
import crypto from "node:crypto"
import Segment, { DistanceSegment, TimeSegment } from "./Segment"

export default abstract class Ride {
    lastLocation: Location

    constructor(readonly rideId: string, lat: number, long: number, date: Date) {
        this.lastLocation = new Location(lat, long, date)
    }

    updateLocation(location: Location) {
        this.lastLocation = location
    }

    abstract createSegment(from: Location, to: Location) : Segment
    abstract calculateFare(segments: Segment[]): number
}

export class DistanceRide extends Ride {

    static create(lat: number, long: number,date: Date) {
        const rideId = crypto.randomUUID()
        return new DistanceRide(rideId, lat, long, date)
    }

    createSegment(from: Location, to: Location): Segment {
        return new DistanceSegment(this.rideId, from, to)
    }

    calculateFare(segments: DistanceSegment[]) {
        let total = 0
        for(const segment of segments) {
            total += segment.getDistance()
        }
        return total * 4
    }
}

export class TimeRide extends Ride {

    static create(lat: number, long: number,date: Date) {
        const rideId = crypto.randomUUID()
        return new TimeRide(rideId, lat, long, date)
    }

    createSegment(from: Location, to: Location): Segment {
        return new TimeSegment(this.rideId, from, to)
    }


    calculateFare(segments: TimeSegment[]) {
        let total = 0
        for(const segment of segments) {
            total += segment.getDiffInMinutes()
        }
        return total * 1
    }
}
