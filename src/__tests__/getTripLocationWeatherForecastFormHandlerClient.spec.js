import { handleGoTripSubmit } from '../client/js/formGoTripHandler'

describe('Get weather info on form submit', () => {
    // https://jestjs.io/docs/en/expect#tobedefined
    test('Check that the function to handle form submit is defined', () => {
        expect(handleGoTripSubmit).toBeDefined()
    })
})
