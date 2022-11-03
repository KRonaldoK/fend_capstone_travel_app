import { checkGoTripFormUserInput } from '../client/js/checkGoTripFormUserInput';

describe('Validate required user input from the go to trip form', () => {
    test('It should return true if the input was informed', () => {
        const validFormInputElement = document.createElement('input')
        validFormInputElement.value = 'Rio de Janeiro'
        expect(checkGoTripFormUserInput([validFormInputElement])).toBeTruthy()
    })
    test('It should return false if the input is empty', () => {
      const invalidFormInputElement = document.createElement('input')
      invalidFormInputElement.value = ''
      expect(checkGoTripFormUserInput([invalidFormInputElement])).toBeFalsy()
    })
})
