import React from 'react';
import { Container, Form, Row, Spinner, Col, Button, Modal, Image, Nav } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { getFunction } from '../CRUDFunctions'
import "../registrationPage/registration.css";

class SignIn extends React.Component {
    state = {
        SignIn: {
            email: "",
            password: "",
        },
        errors: {
            email: 0,
            password: 0,
        },
        errMessage: '',
        loading: false,
        inputs: true,
        show: false,
        redirect: false,
    }
    updateSignInField = (e) => {
        let SignIn = { ...this.state.SignIn }
        let currentId = e.currentTarget.id
        SignIn[currentId] = e.currentTarget.value
        this.setState({ SignIn })
    }
    validateForm = (e) => {
        let currentId = e.currentTarget.id
        let errors = { ...this.state.errors }
        let SignIn = { ...this.state.SignIn }
        let current = SignIn[currentId]
        if (currentId === 'email') errors[currentId] = this.checkEmail(current) ? false : true;
        if (currentId === 'password') errors[currentId] = this.checkPassword(current) ? false : true;
        this.setState({ errors: errors })
        Object.values(this.state.errors).every((el) => el === false) && this.setState({ inputs: false })
    }
    checkEmail = (email) => {
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

    checkPassword = (password) => (password.length > 8 && /\d/.test(password) && /[a-zA-Z]/g.test(password)) ? true : false
    checkForm = async (e) => {
        e.preventDefault()
        const user = await getFunction("user?email=" + this.state.SignIn.email)
        if (user && user.password === this.state.SignIn.password) {
            this.props.getId(user._id)
            this.setState({ redirect: true })
        } else this.setState({ errors: { email: 1, password: 1 } })
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
                    <h2>Sign In</h2>
                    <Row>
                        <Col>

                            <Row>
                                <Col>
                                    <small className={this.state.errors.email === 1 ? "text-danger" : "d-none"} > Entered Email or Password is not Correct</small>
                                    <Form.Group>
                                        <Form.Label htmlFor="email">Your email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            placeholder="example@example.com"
                                            value={this.state.SignIn.email}
                                            onChange={this.updateSignInField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.email ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.email === true ? "text-danger" : "d-none"} >Email should include @ . and be longer than 4 chars</small>
                                    </Form.Group>
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
                                            value={this.state.SignIn.password}
                                            onChange={this.updateSignInField}
                                            onBlur={this.validateForm}
                                            className={this.state.errors.password ? "error" : ""}
                                            required
                                        />
                                        <small className={this.state.errors.password === true ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                                    </Col>
                                </Row>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Button type="submit" id="sign in" variant="danger" disabled={this.state.inputs}>Sign up</Button>
                </Form>
            </Container>

        </div>;
    }
}

export default SignIn;