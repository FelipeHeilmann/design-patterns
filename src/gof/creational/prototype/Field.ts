import crypto from "node:crypto"
import Prototype from "./Prototype"

export default class Field implements Prototype {
    constructor(readonly fieldId: string, readonly formId: string, readonly type: string, readonly title: string){
    }

    static create(type: string, title: string, formId: string) {
        const fieldId = crypto.randomUUID()
        return new Field(fieldId, formId, type, title) 
    }

    clone(): Field {
        return new Field(this.fieldId, this.formId, this.type, this.title)
    }
}