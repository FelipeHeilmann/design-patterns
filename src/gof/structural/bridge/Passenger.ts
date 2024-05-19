import Account from "./Account";

export default class Passenger extends Account{
    constructor(name: string, email: string, document: string, password: string, passwordType: string = "plaintext", readonly cardHolderName: string, readonly cardNumber: string,
    readonly expDate: string, readonly cvv: string) {
            super(name, email, document, password, passwordType)
            if(cvv.length !== 3) throw new Error("Invalid cvv")
    }
}