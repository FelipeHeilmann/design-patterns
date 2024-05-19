import Account from "./Account";

export default class Passenger extends Account {
    constructor(name: string, email: string, document: string, password: string, passwordType: string = "plaintext" ,readonly carPlate: string) {
        super(name, email, document, password, passwordType)
        if(!carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate")
    }
}