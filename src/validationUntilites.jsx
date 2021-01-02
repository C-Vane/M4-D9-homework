export const validateForm = (e) => {
    let currentId = e.currentTarget.id
    let errors = { ...state.errors }
    let registration = { ...state.registration }
    let current = registration[currentId]

    switch (currentId) {
        case 'name':
            errors[currentId] = current.length <= 2 ? true : false;
            break;
        case 'surname':
            errors[currentId] = current.length <= 3 ? true : false;
            break;

        case 'email':
            errors[currentId] = checkEmail(current) ? false : true;
            break;
        case 'password':
            errors[currentId] = checkPassword(current) ? false : true;
            break;
        case 'passwordConfirm':
            errors[currentId] = current === registration.password ? false : true;
            Object.keys(state.registration).forEach((key) => {
                if (state.registration[key] !== '') {
                    currentId = key
                    current = registration[currentId]
                    switch (currentId) {
                        case 'name':
                            errors[currentId] = current.length <= 2 ? true : false;
                            break;
                        case 'surname':
                            errors[currentId] = current.length <= 3 ? true : false;
                            break;

                        case 'email':
                            errors[currentId] = checkEmail(current) ? false : true;
                            break;
                        case 'yearOfBirth':
                            errors[currentId] = current <= 2002 && current >= 1910 ? false : true;
                            break;
                        case 'address':
                            errors[currentId] = current.length <= 5 ? true : false;
                            break;
                        case 'city':
                            errors[currentId] = current.length <= 2 ? true : false;
                            break;
                        case 'postalCode':
                            errors[currentId] = checkPostalCode(current) ? false : true;
                            break;
                        case 'cardNumber':
                            errors[currentId] = checkcardNumber(current) ? false : true;
                            break;
                        case 'cardExpDate':
                            errors[currentId] = checkcardExpiry(current) ? false : true;
                            break;
                        case 'cvvNumber':
                            errors[currentId] = (current.length !== 3) ? true : false;
                            break;

                        default:
                            console.log("Error occurd in Validation")
                            setState({ errMessage: "Error in Validation" })
                            break;
                    }
                }
            })
            break;
        case 'yearOfBirth':
            errors[currentId] = current <= 2002 && current >= 1910 ? false : true;
            break;
        case 'address':
            errors[currentId] = current.length <= 5 ? true : false;
            break;
        case 'city':
            errors[currentId] = current.length <= 2 ? true : false;
            break;
        case 'postalCode':
            errors[currentId] = checkPostalCode(current) ? false : true;
            break;
        case 'cardNumber':
            errors[currentId] = checkcardNumber(current) ? false : true;
            break;
        case 'cardExpDate':
            errors[currentId] = checkcardExpiry(current) ? false : true;
            break;
        case 'cvvNumber':
            errors[currentId] = (current.length !== 3) ? true : false;
            break;

        default:
            console.log("Error occurd in Validation")
            setState({ errMessage: "Error in Validation" })
            break;
    }
    setState({ errors })
    Object.values(state.errors).every((el) => el === false) && setState({ inputs: false })
}
const checkEmail = (email) => {
    let index_found_at, index_found_dot;
    //check if the string exists
    if (email !== "undefined") {
        index_found_at = email.search("@");

        // Find the "@"
        if (index_found_at > -1) {
            //Check if there is only one "@" and if there is a "." after 3 char after "@"
            if (email.includes("@", index_found_at + 1) !== true && email.includes(".", email.indexOf("@") + 3) === true) {
                index_found_dot = email.indexOf(".", index_found_at);
                //Check if there is only 1 "." after "@" and if the given string doesn't start or end with "@" and/or "."
                if (email.includes(".", index_found_dot + 1) !== true && (email.startsWith(".") || email.startsWith("@") || email.endsWith(".") || email.endsWith("@")) !== true) return true;
            }
        }
    }
}
const checkPostalCode = (password) => {
    return (password.length > 4 && /^\d+$/.test(password)) ? true : false;
}

const checkcardNumber = (cardNumber) => {
    let regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    return (regexp.test(cardNumber)) ? true : false;
}
const checkcardExpiry = (cardExpiry) => {
    const date = cardExpiry.split("/" || "-")
    return (date[0] > 0 && date[0] < 13 && date[1] > 20) ? true : false
}
const checkPassword = (password) => (password.length > 8 && /\d/.test(password) && /[a-zA-Z]/g.test(password)) ? true : false
