import Ride from "./Ride"

export default interface IRideRepository {
    getById(rideId: string): Promise<Ride>
    save(ride: Ride): Promise<void>
    update(ride: Ride): Promise<void>
}

export class RideRepositoryMemory implements IRideRepository {
    rides: Ride[]

    constructor() {
        this.rides = []
    }

    async getById(rideId: string): Promise<Ride> {
        const ride = this.rides.find(ride => ride.rideId === rideId)
        if(!ride) throw new Error("Ride not found")
        return ride
    }

    async save(ride: Ride): Promise<void> {
        this.rides.push(ride)
    }

    async update(ride: Ride): Promise<void> {
        const index = this.rides.findIndex(ride => ride.rideId === ride.rideId)
        if(index !== -1) this.rides[index] = ride
    }

}