import IFormRepository from "./FormRepository"

export default class CopyForm {
    constructor(readonly formRepository: IFormRepository) {
    }

    async execute(input: Input): Promise<void> {
        const form = await this.formRepository.getById(input.fromFormId)
        const newForm = form.clone()
        newForm.formId = input.newFormId
        newForm.category = input.newCategory
        newForm.description = input.newDescription
        await this.formRepository.save(newForm)
    }
}

type Input = {
    fromFormId: string,
    newFormId: string,
    newCategory: string,
    newDescription: string
}