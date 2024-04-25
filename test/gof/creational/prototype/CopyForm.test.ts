import CopyForm from "../../../../src/gof/creational/prototype/CopyForm"
import Form from "../../../../src/gof/creational/prototype/Form"
import { FormRepositoryMemory } from "../../../../src/gof/creational/prototype/FormRepository"

test("Deve copiar um formulário", async function() {
    const formRepository = new FormRepositoryMemory()
    const form = new Form("1", "Marketing", "Leads v1")
    form.addField("text","name")
    form.addField("text","email")
    formRepository.save(form)
    const input = {
        fromFormId: "1",
        newFormId: "2",
        newCategory: "Marketing",
        newDescription: "Leads v2"
    }
    const copyForm = new CopyForm(formRepository)
    await copyForm.execute(input)
    const copiedForm = await formRepository.getById("2")
    expect(copiedForm?.category).toBe("Marketing") 
    expect(copiedForm?.description).toBe("Leads v2") 
    expect(copiedForm?.fields.at(0)?.type).toBe("text") 
    expect(copiedForm?.fields.at(0)?.title).toBe("name") 
    expect(copiedForm?.fields.at(1)?.type).toBe("text") 
    expect(copiedForm?.fields.at(1)?.title).toBe("email") 
})