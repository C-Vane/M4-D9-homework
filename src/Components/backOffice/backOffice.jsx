import React from 'react';
import { Image, Nav, Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFunction } from '../CRUDFunctions';
import "../registrationPage/registration.css";
import { Admin, AdminList, AdminModal, Buttons, NavBar } from './backOfficeUtils'

class BackOffice extends React.Component {
    state = {
        adminModal: false,
        movieModal: false,
        editAdmin: false,
        deleteAdmin: false,
        movies: [],
        admins: [],
        currentAdmin: {},
        currentMovie: {},
        formAdmin: {
            address: "",
            city: "",
            email: "",
            name: "",
            password: "",
            postalCode: "",
            role: "admin",
            surname: "",
            yearOfBirth: 0,
            image: "",
        },
        formMovie: {
            Poster: "",
            Title: "",
            Type: "",
            Year: "",
            imdbID: "",
        }
    }
    handleModal = (element, status, type) => {
        const state = this.state;
        state[element] = status;
        state.editAdmin = type === "edit" ? true : false
        this.setState(state)
    }
    componentDidMount = () => {
        this.getData("admins")
        this.getData("movies")
    }
    getData = async (endp) => {
        const response = await getFunction(endp === "admins" ? "user/admin" : "media")
        if (response) {
            const state = { ...this.state }
            state[endp] = response
            this.setState(state)
        } else {
            console.log("error occured")
        }
    }
    onChange = () => { }
    current = (element, data) => {
        const state = { ...this.state }
        state[element] = data;
        this.setState(state)
    }
    submint = () => { }

    render() {
        const { logOut, admin } = this.props
        const { adminModal, movieModal, admins, currentAdmin, editAdmin, deleteAdmin, formAdmin, formMovie } = this.state
        return <div className="background">
            <NavBar logOut={logOut} />
            <Container className="mt-4">
                <Row>
                    <Col md={8}>
                        <Admin user={currentAdmin.name ? currentAdmin : admin} handleModal={this.handleModal} /></Col>
                    <Col md={4}>
                        <Buttons handleModal={this.handleModal} />
                        <AdminList admins={admins} viewAdmin={this.current} />
                    </Col>
                </Row>
                <Row></Row>
                <AdminModal show={adminModal} edit={editAdmin} handleModal={this.handleModal} onChange={this.onChange} currentAdmin={editAdmin ? currentAdmin : formAdmin} submit={this.submit} />
            </Container>
        </div>
    }
}

export default BackOffice