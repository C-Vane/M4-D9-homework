import React from 'react';
import { Container, Form, Row, Spinner, Col, Button, Modal, Image, Nav, Table, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { checkcardExpiry, checkcardNumber, checkEmail, checkPassword, checkPostalCode } from '../../validationUntilites';
import { postFunction } from '../CRUDFunctions';
import "./registration.css";

class Registration extends React.Component {
    state = {
        registration: {
            name: "",
            surname: "",
            email: "",
            password: "",
            passwordConfirm: "",
            yearOfBirth: "",
            address: "",
            city: "",
            postalCode: "",
            cardNumber: "",
            cardExpDate: "",
            cvvNumber: "",
        },
        redirect: false,
        errors: {
            name: 0,
            surname: 0,
            email: 0,
            password: 0,
            passwordConfirm: 0,
            yearOfBirth: 0,
            address: 0,
            city: 0,
            postalCode: 0,
            cardNumber: 0,
            cardExpDate: 0,
            cvvNumber: 0,
        },
        errMessage: '',
        loading: false,
        inputs: true,
        show: false,
    }
    updateRegistrationField = (e) => {
        let registration = { ...this.state.registration }
        let currentId = e.currentTarget.id
        registration[currentId] = e.currentTarget.value
        this.setState({ registration })
    }
    validateForm = (e) => {
        let currentId = e.currentTarget.id
        let errors = { ...this.state.errors }
        let registration = { ...this.state.registration }
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
                Object.keys(this.state.registration).forEach((key) => {
                    if (this.state.registration[key] !== '') {
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
                                this.setState({ errMessage: "Error in Validation" })
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
                this.setState({ errMessage: "Error in Validation" })
                break;
        }
        this.setState({ errors })
        Object.values(errors).every((el) => el === false) && this.setState({ inputs: false })
    }

    checkForm = (e) => {
        e.preventDefault()
        this.setState({ show: true })
    }
    handleClose = () => this.setState({ show: false })
    createAccount = async () => {
        this.handleClose()
        const user = await postFunction("user", this.state.registration)
        if (user) {
            this.props.getId(user._id)
            this.setState({ redirect: true })
        } else {
            this.setState({ errMessage: typeof (user) === "object" ? user.errors[0].msg : "Email already Used" })
            setTimeout(() => {
                this.setState({ errMessage: "" })
            }, 2000);
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/main" />
        }
        return <div className="background">
            <Nav>
                <Link to="/">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix-font"
                        style={{ backgroundColor: "transparent" }} width="200px" /></Link>
                <Link to="/signIn">
                    <Button className="btns" style={{ position: "absolute", right: 0 }} >Sign In</Button></Link>
            </Nav>
            {this.state.errMessage.length > 0 && <Alert variant="denger">{this.state.errMessage}</Alert>}
            {
                this.state.loading && (
                    <Row className="ml-2 d-flex justify-content-center ">
                        <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Row>
                )
            }
            <Container>
                <Form onSubmit={this.checkForm} className="register">
                    <h2>Sign Up</h2>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <small className={this.state.errMessage ? "text-danger" : "d-none"} > {this.state.errMessage}</small>
                                    <Form.Group>
                                        <Form.Label htmlFor="name">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            placeholder="Your name"
                                            value={this.state.registration.name}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.name ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.name ? "text-danger" : "d-none"} >Name should be longer than 2 chars</small>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="surname">Surname</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            autoComplete="family-name"
                                            placeholder="Your surname"
                                            value={this.state.registration.surname}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.surname ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.surname ? "text-danger" : "d-none"} >Surname should be longer than 3 chars</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={9}>
                                    <Form.Group>
                                        <Form.Label htmlFor="email">Your email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            placeholder="example@example.com"
                                            value={this.state.registration.email}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.email ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.email ? "text-danger" : "d-none"} >Email should include @ . and be longer than 4 chars</small>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="yearOfBirth">Year of Birth</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="yearOfBirth"
                                            id="yearOfBirth"
                                            autoComplete="bday-year"
                                            value={this.state.registration.yearOfBirth}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            placeholder="YYYY"
                                            className={this.state.errors.yearOfBirth ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.yearOfBirth ? "text-danger" : "d-none"} >Year of Birth should be before 2002 and after 1910</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="address">Street address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Your address"
                                            value={this.state.registration.address}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.address ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.address ? "text-danger" : "d-none"} >Address should be longer than 5 chars</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="city">City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            id="city"
                                            placeholder="Your city"
                                            value={this.state.registration.city}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.city ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.city ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postalCode"
                                            id="postalCode"
                                            placeholder="00000"
                                            value={this.state.registration.postalCode}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.postalCode ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.postalCode ? "text-danger" : "d-none"} >Postal Code should be a 5 digit number and should't include chars</small>                                 </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="cardNumber">Credit Card Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            maxLength="19"
                                            name="cardNumber"
                                            id="cardNumber"
                                            autoComplete="cc-number"
                                            placeholder="xxxx-xxxx-xxxx-xxxx"
                                            value={this.state.registration.cardNumber}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.cardNumber ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.cardNumber ? "text-danger" : "d-none"} >The creadit card number you enterd is not correct</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="cardExpDate">Card Exp. Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cardExpDate"
                                            id="cardExpDate"
                                            autoComplete="cc-exp"
                                            placeholder="MM/YY"
                                            value={this.state.registration.cardExpDate}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.cardExpDate ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.cardExpDate ? "text-danger" : "d-none"} >Card exp. date should be in a mm/yy format</small>                                 </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label htmlFor="cvvNumber">CVV number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="cvvNumber"
                                            id="cvvNumber"
                                            autoComplete="cc-exp"
                                            placeholder="000"
                                            value={this.state.registration.cvvNumber}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.cvvNumber ? "error" : ""}
                                            required
                                        />

                                        <small className={this.state.errors.cvvNumber ? "text-danger" : "d-none"} >The CVV number should be a 3 digit number</small>                                 </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label htmlFor="password">Your password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            placeholder=""
                                            value={this.state.registration.password}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.password ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.password ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="passwordConfirm">Confirm Your password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="passwordConfirm"
                                            autoComplete="new-password"
                                            id="passwordConfirm"
                                            placeholder=""
                                            value={this.state.registration.passwordConfirm}
                                            onChange={this.updateRegistrationField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.passwordConfirm ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.passwordConfirm ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                                    </Col>
                                </Row>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Button type="submit" id="sign in" variant="danger" disabled={this.state.inputs}>Sign up</Button>
                </Form>
            </Container>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Netflix Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table size="sm" responsive>
                        <tbody>
                            {Object.keys(this.state.registration).map((key) =>
                                <tr>
                                    <td><strong>{key.split(/(?=[A-Z])/).join(" ").toUpperCase()}</strong></td>
                                    <td>{this.state.registration[key]}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={this.handleClose}>
                        Close
          </Button>
                    <Button variant="danger" onClick={this.createAccount}>
                        Create Account
          </Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
}

export default Registration;