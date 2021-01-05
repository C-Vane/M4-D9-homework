
import { Button, Form, Modal } from "react-bootstrap";

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

export const SettingsModal = ({ show, type, onChange, handleModal, validateForm, updateAccount, currentUser, error }) => <Modal show={show} onHide={() => handleModal(type)}>
    <Modal.Header closeButton>
        <Modal.Title>Update {type}</Modal.Title>
    </Modal.Header>

    <Form onSubmit={updateAccount}>
        <Modal.Body className=" px-3">
            {type === "email" && <Form.Group >
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="example@example.com"
                    value={currentUser.email}
                    onChange={onChange}
                    onBlur={() => validateForm(type)}
                    className={error ? "error" : ""}
                    required
                />
                <small className={error ? "text-danger" : "d-none"} >{error}</small>
            </Form.Group>

            }
            {type === "password" && <div>
                <small className={error ? "text-danger" : "d-none"} >{error}</small>
                <Form.Group>
                    <Form.Label htmlFor="password">Password </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        placeholder=""
                        value={currentUser.password}
                        onChange={onChange}
                        className={error ? "error" : ""}
                        required
                    />
                    <small className={error ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="passwordConfirm">Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwordConfirm"
                        autoComplete="new-password"
                        id="passwordConfirm"
                        placeholder=""
                        onBlur={() => validateForm(type)}
                        className={error ? "error" : ""}
                        required
                    />
                    <small className={error ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                </Form.Group>
            </div>
            }
            {type === "phoneNumber" && <div></div>}

            {type === "address" &&
                <div>
                    <small className={error ? "text-danger" : "d-none"} >{error}</small>
                    <Form.Group>
                        <Form.Label htmlFor="address">Street address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Your address"
                            value={currentUser.address}
                            onChange={onChange}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >Address should be longer than 5 chars</small>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Your city"
                            value={currentUser.city}
                            onChange={onChange}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            placeholder="00000"
                            value={currentUser.postalCode}
                            onChange={onChange}
                            onBlur={() => validateForm(type)}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >Postal Code should be a 5 digit number and should't include chars</small>
                    </Form.Group>
                </div>}

            {type === "payment" &&
                <div>
                    <Form.Group>
                        <Form.Label htmlFor="cardNumber">Credit Card Number</Form.Label>
                        <Form.Control
                            type="tel"
                            maxLength="19"
                            name="cardNumber"
                            id="cardNumber"
                            autoComplete="cc-number"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            value={currentUser.cardNumber}
                            onChange={onChange}
                            onBlur={validateForm}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >The creadit card number you enterd is not correct</small>                                 </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="cardExpDate">Card Exp. Date</Form.Label>
                        <Form.Control
                            type="text"
                            name="cardExpDate"
                            id="cardExpDate"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                            value={currentUser.cardExpDate}
                            onChange={onChange}
                            onBlur={validateForm}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >Card exp. date should be in a mm/yy format</small>                                 </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="cvvNumber">CVV number</Form.Label>
                        <Form.Control
                            type="number"
                            name="cvvNumber"
                            id="cvvNumber"
                            autoComplete="cc-exp"
                            placeholder="000"
                            value={currentUser.cvvNumber}
                            onChange={onChange}
                            onBlur={validateForm}
                            className={error ? "error" : ""}
                            required
                        />

                        <small className={error ? "text-danger" : "d-none"} >The CVV number should be a 3 digit number</small>                                 </Form.Group>
                </div>

            }

        </Modal.Body>
    </Form>
    <Modal.Footer>
        <Button variant="outline-dark" className="rounded-0 p-1 px-5 " onClick={() => handleModal(type)}>
            Close
          </Button>
        <Button variant="dark" disabled={error.length > 0 && error === 0 ? true : false} className="rounded-0 p-1 px-3" type="submit">
            Save Changes
        </Button>
    </Modal.Footer>
</Modal>