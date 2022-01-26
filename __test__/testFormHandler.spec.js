import { handleSubmit, postData } from "../src/client/js/formHandler"

describe('Testing the submit functionality', () => {
    test('Testing the handleSubmit() function', () => {
        expect(handleSubmit).toBeDefined();
    })

    test('Testing the postData() function', () => {
        expect(postData).toBeDefined()
    })
})
