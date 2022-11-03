const checkGoTripFormUserInput = (formElements) => {
    for (let formElement of formElements) {
        if (!formElement.value) {
            formElement.classList.add('inputError')
            return false
        } else {
            formElement.classList.remove('inputError')
            return true
        }
    }
}

export { checkGoTripFormUserInput }
