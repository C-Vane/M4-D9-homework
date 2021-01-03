export const checkEmail = (email) => {
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
export const checkPostalCode = (postal) => {
    return (postal.length > 4 && /^\d+$/.test(postal)) ? true : false;
}

export const checkcardNumber = (cardNumber) => {
    let regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    return (regexp.test(cardNumber)) ? true : false;
}
export const checkcardExpiry = (cardExpiry) => {
    const date = cardExpiry.split("/" || "-")
    return (date[0] > 0 && date[0] < 13 && date[1] > 20) ? true : false
}
export const checkPassword = (password) => (password.length > 8 && /\d/.test(password) && /[a-zA-Z]/g.test(password)) ? true : false
