import CalculateFare from "../../../../src/gof/creational/factory_method/CalculateFare"
import { DistanceRide, TimeRide } from "../../../../src/gof/creational/factory_method/Ride"
import { RideRepositoryMemory } from "../../../../src/gof/creational/factory_method/RideRepository"
import { SegmentRepositoryMemory } from "../../../../src/gof/creational/factory_method/SegmentRepository"
import UpdateLocation from "../../../../src/gof/creational/factory_method/UpdateLocation"

test("Deve atualizar a localização por distância", async function() {
    const rideRepository = new RideRepositoryMemory()
    const segmentRepository = new SegmentRepositoryMemory()
    const ride = DistanceRide.create(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    await rideRepository.save(ride)
    const input = {
		rideId: ride.rideId,
		lat: -27.496887588317275,
		long: -48.522234807851476,
		date: new Date("2021-03-01T12:00:00")
	}
    const updateLocation = new UpdateLocation(rideRepository, segmentRepository)
    await updateLocation.execute(input)
    const calculateFare = new CalculateFare(rideRepository, segmentRepository)
    const output = await calculateFare.execute({rideId: ride.rideId})
    expect(output.fare).toBe(40)
})

test("Deve atualizar a localização por tempo", async function() {
    const rideRepository = new RideRepositoryMemory()
    const segmentRepository = new SegmentRepositoryMemory()
    const ride = TimeRide.create(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    await rideRepository.save(ride)
    const input = {
		rideId: ride.rideId,
		lat: -27.496887588317275,
		long: -48.522234807851476,
		date: new Date("2021-03-01T12:00:00")
	}
    const updateLocation = new UpdateLocation(rideRepository, segmentRepository)
    await updateLocation.execute(input)
    const calculateFare = new CalculateFare(rideRepository, segmentRepository)
    const output = await calculateFare.execute({rideId: ride.rideId})
    expect(output.fare).toBe(120)
})