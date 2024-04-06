import Ticket from "../../../../src/gof/behavioral/state/Ticket"

test("Deve fazer transição de status em um ticket", function() {
    const costumerId = 1
    const ticket = new Ticket(costumerId, new Date("2024-04-05T10:00:00"))
    expect(ticket.getStatus()).toBe("requested")
    expect(ticket.getStatistic(new Date("2024-04-05T11:00:00")).requestDuration).toBe(1)
    const employeeId = 2
    ticket.assign(employeeId, new Date("2024-04-05T12:00:00"))
    expect(ticket.getStatus()).toBe("assigned")
    expect(ticket.getStatistic(new Date("2024-04-05T11:00:00")).requestDuration).toBe(2)
    ticket.start(new Date("2024-04-05T14:00:00"))
    expect(ticket.getStatus()).toBe("in_progress")
    expect(ticket.getStatistic(new Date("2024-04-05T11:00:00")).assignDuration).toBe(2)
    ticket.close(new Date("2024-04-05T18:00:00"))
    expect(ticket.getStatus()).toBe("closed")
    expect(ticket.getStatistic(new Date("2024-04-05T11:00:00")).progressDuration).toBe(4)

})