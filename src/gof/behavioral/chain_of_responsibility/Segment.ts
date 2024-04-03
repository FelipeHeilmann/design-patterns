export default class Segment {
    constructor(readonly distance: number, readonly date: Date) {
        if (!this.isValidDate()) throw new Error("Invalid date")
        if (!this.isValidDistance()) throw new Error("Invalid distance")
    }

    private isValidDistance() {
        return this.distance != null && this.distance != undefined && typeof this.distance === "number" && this.distance > 0
    }

    private isValidDate() {
        return this.date != null && this.date != undefined && this.date instanceof Date && this.date.toString() !== "Invalid Date"
    }

    isOvernight() {
        return this.date.getHours() >= 22 || this.date.getHours() <= 6
    }

    isSunday() {
        return this.date.getDay() === 0
    }
}