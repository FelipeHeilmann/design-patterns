import { RoomRepositoryDatabase } from "../../../../src/gof/structural/decorator/RoomRepository"

test("Deve obter um quarto", async function() {
    const roomRepository = new RoomRepositoryDatabase()
    const room = await roomRepository.getById(1)
    expect(room.category).toBe("suite")
    expect(room.price).toBe(500)
})

test("Deve obter um quarto disponível para reserva no periodo", async function() {
    const roomRepository = new RoomRepositoryDatabase()
    const checkinDate = new Date("2021-03-01T10:00:00")
    const checkoutDate =new Date("2021-03-05T10:00:00")
    const [room] = await roomRepository.getAvailableRoomsByPeriodAndCategory(checkinDate, checkoutDate, "suite")
    expect(room.category).toBe("suite")
    expect(room.price).toBe(500)
})

test("Não deve obter um quarto quarto disponível para reserva em um período", async function () {
	const roomRepository = new RoomRepositoryDatabase()
    const checkinDate = new Date("2021-03-11T15:00:00")
    const checkoutDate = new Date("2021-03-12T10:00:00")
	const rooms = await roomRepository.getAvailableRoomsByPeriodAndCategory(checkinDate,checkoutDate , "suite")
	expect(rooms).toHaveLength(0)
})