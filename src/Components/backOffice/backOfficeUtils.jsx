import { Image, Nav, Button, Form, Col, Row, Card, ListGroup, Table, FormControl, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = (props) => {
    return (
        <Nav>
            <Link to="/">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix-font"
                    style={{ backgroundColor: "transparent" }} width="200px" /></Link>
            <Link to="/">
                <Button className="btns" onClick={props.logOut} style={{ position: "absolute", right: 0 }} >Log Out</Button></Link>
        </Nav>)
}
export const Admin = ({ user, handleModal }) => {
    const { name, surname, email, role, image } = user;
    return (
        <>
            <h3>Admin</h3>
            <Row style={{ height: "30vh" }}>
                <Col sm={4} className="pr-5" style={{ overflow: "hidden", height: "30vh" }} >
                    <Image style={{ objectFit: "contain", height: "100%" }} src={image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded />
                </Col>
                <Col sm={8}>
                    <div className="register m-0 p-0 ml-2 pl-3" >
                        <div className="text-white mt-3 px-4">
                            <Row className="justify-content-between py-2 m-auto">Name: <strong>{name + " " + surname}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">E-mail:<strong>{email}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">Role:<strong>{role}</strong></Row>
                        </div>
                    </div>
                    <Row className="justify-content-end mr-2">
                        <Button className="mx-1 my-1" variant={"outline-light"} onClick={() => handleModal("adminModal", true, "edit")} >Edit</Button>
                        <Button className="mx-1 my-1" variant={"outline-light"} onClick={() => handleModal("deleteModal", true, "admin")}>Delete</Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export const Buttons = ({ handleModal }) => <Row>
    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => handleModal("adminModal", true)}>Add Admin</Button>

    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => handleModal("movieModal", true)}>Add Movie</Button>
</Row >
export const AdminModal = ({ show, submit, handleModal, edit, onChange, currentAdmin }) =>
    <Modal show={show} onHide={() => handleModal("adminModal", false)}>
        <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit Admin" : "Add new Admin"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit} className="register">
            <Modal.Body>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="given-name"
                                        placeholder="Your name"
                                        value={currentAdmin.name}
                                        onChange={onChange}
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
                                        value={currentAdmin.surname}
                                        onChange={onChange}
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
                                        value={currentAdmin.email}
                                        onChange={onChange}
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
                                        value={currentAdmin.yearOfBirth}
                                        onChange={onChange}
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
                                        value={currentAdmin.address}
                                        onChange={onChange}
                                        onBlur={this.validateForm}
                                        className={this.state.errors.address ? "error" : ""}
                                        required
                                    />

                                    <small className={this.state.errors.address ? "text-danger" : "d-none"} >Address should be longer than 5 chars</small>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label htmlFor="city">City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Your city"
                                        value={currentAdmin.city}
                                        onChange={onChange}
                                        onBlur={onChange}
                                        className={this.state.errors.city ? "error" : ""}
                                        required
                                    />

                                    <small className={this.state.errors.city ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="postalCode"
                                        id="postalCode"
                                        placeholder="00000"
                                        value={currentAdmin.postalCode}
                                        onChange={onChange}
                                        onBlur={this.validateForm}
                                        className={this.state.errors.postalCode ? "error" : ""}
                                        required
                                    />

                                    <small className={this.state.errors.postalCode ? "text-danger" : "d-none"} >Postal Code should be a 5 digit number and should't include chars</small>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Your password </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        placeholder=""
                                        value={currentAdmin.password}
                                        onChange={onChange}
                                        onBlur={this.validateForm}
                                        className={this.state.errors.password ? "error" : ""}
                                        required
                                    />
                                    <small className={this.state.errors.password ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label htmlFor="passwordConfirm">Confirm Your password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwordConfirm"
                                        autoComplete="new-password"
                                        id="passwordConfirm"
                                        placeholder=""
                                        value={currentAdmin.passwordConfirm}
                                        onChange={onChange}
                                        onBlur={this.validateForm}
                                        className={this.state.errors.passwordConfirm ? "error" : ""}
                                        required
                                    />
                                    <small className={this.state.errors.passwordConfirm ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModal("adminModal", false)}>
                    Close
          </Button>
                <Button variant="primary" type="submit" onClick={() => handleModal("adminModal", false)}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Form>
    </Modal >


const movieModal = {}
const movieTable = {}
export const AdminList = ({ admins, viewAdmin }) =>
    <div>
        <h5>Admin List</h5>
        <Table variant="dark" className="register p-0" hover size="sm">
            <tbody >
                {admins.map((admin) => <tr onClick={() => viewAdmin("currentAdmin", admin)}>
                    <td style={{ overflow: "hidden", height: "8vh" }}> <Image style={{ objectFit: "contain", height: "100%" }} src={admin.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded /></td>
                    <td className=" text-white w-100">{admin.name} {admin.surname}</td>
                </tr>)}
            </tbody>
        </Table>
    </div>


