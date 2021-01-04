
import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteModal } from '../backOffice/backOfficeUtils';
import { deleteFunction, putFunction } from '../CRUDFunctions';

const AccountPage = ({ getId, user, logOut }) => {
    const [currentUser, setCurrentUser] = useState(user)
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [type, setType] = useState()
    const [alert, setAlert] = useState()
    const deleteAccount = async () => {
        const response = await deleteFunction("/user" + user._id)
        setAlert(response)
        setTimeout(() => {
            logOut()
        }, 1200);
    }
    const updateAccount = async (e) => {
        e.preventDefault()
        const response = await putFunction("/user" + user._id, currentUser)
        if (response) {
            setAlert("Account updated")
            setModal(true)
            setTimeout(() => {
                setAlert("")
            }, 1500);
            getId(user._id)
        }
    }
    const onChange = (e) => {
        const current = currentUser
        current[e.currentTarget.id] = e.currentTarget.value
        setCurrentUser(current)
    }
    const handleModal = (item) => {
        if (item === "deleteAdmin") {
            setDeleteModal(!deleteModal)
        } else {
            setType(item)
            setModal(!modal)
        }
    }
    return <div className="account">
        {alert && <Alert variant="warning">{alert}</Alert>}
        <Container>
            <h1 className="pt-3 font-weight-lighter ">My Account</h1>
            <Row className="marngin-top pt-2 mt-4">
                <Col md={4}>
                    <h4 className="m-2 text-black-50  font-weight-lighter">MEMBERSHIP & BILLING</h4>
                    <Button variant="light" onClick={() => setDeleteModal(true)} >CANCEL MEMBERSHIP</Button>
                </Col>
                <Col md={8} >
                    <Row className="flex-column align-items-end pr-3">
                        <Button variant="link" className="p-0 m-0">Change email</Button>
                        <Button variant="link" className="p-0 m-0">Change password</Button>
                        <Button variant="link" className="p-0 m-0">Add phone number</Button>
                        <Button variant="link" className="p-0 m-0">Email preferences</Button>
                    </Row>
                    <Row className="marngin-top-light pt-2 mt-4 flex-column pr-3">
                        <div className="d-flex justify-content-between"><i><i className="fab fa-paypal"></i> PayPal</i><Button variant="link" className="p-0 m-0">Update payment info</Button></div>

                        <Button variant="link" className="p-0 m-0 align-self-end">Billing details</Button>
                    </Row>
                </Col>
            </Row>
            <Row className="marngin-top-light">
                <Col md={4}>
                    <h5 className="m-2 text-black-50  font-weight-lighter">PLAN DETAILS</h5>
                </Col>
                <Col md={8} >
                    <div className="d-flex justify-content-between"><strong>2 Screens + hd </strong> <Button variant="link" className="p-0 m-0">Change plan</Button></div>
                    <p>Your plan price is guaranteed until at least 10 May 2021</p>
                </Col>
            </Row>
            <Row className="marngin-top-light">
                <Col md={4}>
                    <h5 className="m-2 text-black-50  font-weight-lighter">SETTINGS</h5>
                </Col>
                <Col md={8} className="d-flex flex-column align-items-baseline">
                    <Button variant="link" className="p-0 m-0">Test participation</Button>
                    <Button variant="link" className="p-0 m-0">Activate a device</Button>
                    <Button variant="link" className="p-0 m-0">Sign out of all devices</Button>
                </Col>
            </Row>
            <Row className="marngin-top pt-2 mt-4">
                <Col md={4}>
                    <h4 className="m-2 text-black-50 font-weight-lighter">MY PROFILE</h4>
                </Col>
                <Col md={8} >
                    <div className="d-flex justify-content-between" ><div className="d-flex"><div className="contain mr-3"><Image style={{ objectFit: "contain", minHeight: "100%", minWidth: "100%" }} src={user.image ? user.image : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"} /></div> <p>{user.name ? user.name + " " + user.surname : "striveStudent"}</p></div>

                        <Link to="/profile"><Button variant="link" className="p-0 m-0">Manage profiles</Button></Link></div>
                    <Row>
                        <Col className="d-flex flex-column align-items-baseline">
                            <Button variant="link" className="p-0 m-0">Language</Button>
                            <Button variant="link" className="p-0 m-0">Playback settings</Button>
                            <Button variant="link" className="p-0 m-0">Subtitle appearance</Button>
                        </Col>
                        <Col className="d-flex flex-column align-items-baseline">
                            <Button variant="link" className="p-0 m-0">Viewing activity</Button>
                            <Button variant="link" className="p-0 m-0">Ratings</Button>
                            <Button variant="link" className="p-0 m-0">Reviews</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="marngin-top pt-3 mt-4 pb-5">
                <Col md={4}>
                    <h4 className="m-2 text-black-50 font-weight-lighter">GIFTS AND OFFERS</h4>
                </Col>
                <Col md={8} >
                    <div className="d-flex justify-content-between">
                        <Form>
                            <div className="d-flex">
                                <Form.Control type="text" id="redeem" placeholder="Enter code or PIN" />
                                <Button variant="light" type="submit">Redeem</Button>
                            </div>
                        </Form>
                        <Button variant="link" className="p-0 m-0">Where to buy gift cards</Button></div>
                </Col>
            </Row>
        </Container>
        <DeleteModal show={deleteModal} type={"account"} deleteFunction={deleteAccount} handleModal={handleModal} />
    </div >;
}



export default AccountPage;