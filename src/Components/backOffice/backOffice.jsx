import React from 'react';
import { Image, Nav, Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../registrationPage/registration.css";
import { Admin, Buttons, NavBar } from './backOfficeUtils'

class BackOffice extends React.Component {
    state = {
        admin: true,
        movie: true,
        movies: [],
        admins: [],
        currentAdmin: {},
        currentMovie: {}
    }
    handleModal = (element, type) => {
        const state = this.state;
        state[element] = type;
        this.setState(state)
    }

    render() {
        const { logOut, admin } = this.props
        return <div className="background">
            <NavBar logOut={logOut} />
            <Container className="mt-4">
                <Row>
                    <Col md={8}><Admin user={admin} /></Col>
                    <Col md={4}>
                        <Buttons /></Col>
                </Row>

            </Container>
        </div>
    }
}

export default BackOffice