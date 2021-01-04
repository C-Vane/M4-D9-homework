import { Image, Nav, Button, Form, Col, Row, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageUploader from "react-images-upload";
import { Scrollbars } from 'react-custom-scrollbars';

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
                <Col sm={4} className="p-0 d-none d-sm-flex justify-content-center align-items-center overflow-hidden w-100 h-100"   >
                    <Image style={{ objectFit: "contain", minWidth: "100%", height: "100%", objectPosition: "100%" }} src={image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded />
                </Col>
                <Col sm={8}>
                    <div className="m-0 p-1 ml-2 pl-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                        <div className="text-white mt-3 px-4">
                            <Row className="justify-content-between py-2 m-auto">Name: <strong>{name + " " + surname}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">E-mail:<strong>{email}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">Role:<strong>{role}</strong></Row>
                        </div>
                    </div>
                    <Row className="justify-content-end mr-2">
                        <Button className="m-1" variant={"outline-light"} onClick={() => handleModal("adminModal", true, "edit", user)} >Edit</Button>
                        <Button className="m-1" variant={"outline-light"} onClick={() => handleModal("deleteAdmin", true, "admin", user)}>Delete</Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export const Buttons = ({ handleModal }) => <Row className=" mt-4">
    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => handleModal("adminModal", true)}>Add Admin</Button>

    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => handleModal("movieModal", true)}>Add Movie</Button>
</Row >
export const AdminModal = ({ show, passwordConfirm, errors, submit, handleModal, edit, onChange, formAdmin, validateForm, desabled, setImage }) => <>
    <Modal show={show} onHide={() => handleModal("adminModal", false)}>
        <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit Admin" : "Add new Admin"}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={submit}>
            <Modal.Body className=" p-3">
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
                                value={formAdmin.name}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.name ? "error" : ""}
                                required
                            />
                            <small className={errors.name ? "text-danger" : "d-none"} >Name should be longer than 2 chars</small>
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
                                value={formAdmin.surname}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.surname ? "error" : ""}
                                required
                            />
                            <small className={errors.surname ? "text-danger" : "d-none"} >Surname should be longer than 3 chars</small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                placeholder="example@example.com"
                                value={formAdmin.email}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.email ? "error" : ""}
                                required
                            />
                            <small className={errors.email ? "text-danger" : "d-none"} >Email should include @ . and be longer than 4 chars</small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label htmlFor="yearOfBirth">Year of Birth</Form.Label>
                            <Form.Control
                                type="number"
                                name="yearOfBirth"
                                id="yearOfBirth"
                                autoComplete="bday-year"
                                value={formAdmin.yearOfBirth}
                                onChange={onChange}
                                onBlur={validateForm}
                                placeholder="YYYY"
                                className={errors.yearOfBirth ? "error" : ""}
                                required
                            />
                            <small className={errors.yearOfBirth ? "text-danger" : "d-none"} >Year of Birth should be before 2002 and after 1910</small>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label htmlFor="address">Street address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Your address"
                                value={formAdmin.address}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.address ? "error" : ""}
                                required
                            />

                            <small className={errors.address ? "text-danger" : "d-none"} >Address should be longer than 5 chars</small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label htmlFor="city">City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Your city"
                                value={formAdmin.city}
                                onChange={onChange}
                                onBlur={onChange}
                                className={errors.city ? "error" : ""}
                                required
                            />

                            <small className={errors.city ? "text-danger" : "d-none"} >City should be longer than 2 chars</small>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                placeholder="00000"
                                value={formAdmin.postalCode}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.postalCode ? "error" : ""}
                                required
                            />

                            <small className={errors.postalCode ? "text-danger" : "d-none"} >Postal Code should be a 5 digit number and should't include chars</small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                placeholder=""
                                value={formAdmin.password}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.password ? "error" : ""}
                                required
                            />
                            <small className={errors.password ? "text-danger" : "d-none"} >Password should be longer than 8 chars, 1 digit, 1 letter</small>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="passwordConfirm">Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordConfirm"
                                autoComplete="new-password"
                                id="passwordConfirm"
                                placeholder=""
                                value={passwordConfirm}
                                onChange={onChange}
                                onBlur={validateForm}
                                className={errors.passwordConfirm ? "error" : ""}
                                required
                            />
                            <small className={errors.passwordConfirm ? "text-danger" : "d-none"} >The passwords you enterd don't match</small>
                        </Form.Group>
                    </Col>
                </Row>
                <ImageUploader
                    withIcon={true}
                    buttonText="Upload Image"
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage={true}
                    withPreview={true}
                    withLabel={false}
                    onChange={(image) => setImage(image)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" className="rounded-0 p-1 px-5 " onClick={() => handleModal("adminModal", false)}>
                    Close
          </Button>
                <Button variant="dark" disabled={desabled} className="rounded-0 p-1 px-3" type="submit">
                    {edit ? "Save Changes" : "Create new Admin"}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal >
</>

export const DeleteModal = ({ show, type, handleModal, deleteFunction }) =>
    <Modal show={show} onHide={() => handleModal(type === "movie" ? "deleteMovie" : "deleteAdmin", false)}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this {type} ?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => handleModal(type === "movie" ? "deleteMovie" : "deleteAdmin", false)}>
                No
          </Button>
            <Button variant="primary" onClick={() => deleteFunction(type)}>
                Yes
          </Button>
        </Modal.Footer>
    </Modal>

export const MovieList = ({ movies, handleModal }) => <Col>
    <h3> Movies & Media</h3>
    <Scrollbars style={{ height: "50vh" }}>
        <Table variant="dark" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", height: "50vh", overflowY: "scroll" }} className="p-0" hover size="lg" responsive="md">
            <thead>
                <tr >
                    <th>#</th>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th>Edit/Delete </th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, key) => <tr key={key}>
                    <td>{key + 1}</td>
                    <td><Image src={movie.Poster ? movie.Poster : "https://place-hold.it/30"} height='30px' /></td>
                    <td>{movie.Title}</td>
                    <td>{movie.Type}</td>
                    <td>{movie.Year}</td>
                    <td>
                        <Row>
                            <Col><Button variant='dark' onClick={() => handleModal("movieModal", true, "edit", movie)} className="w-100 p-2">
                                Edit
              </Button></Col>
                            <Col>
                                <Button onClick={() => handleModal("deleteMovie", true, "", movie)} variant='outline-secondary' className="m-1 p-2 rounded-0 w-100">
                                    Delete
              </Button></Col></Row></td>
                </tr>)}
            </tbody>
        </Table>
    </Scrollbars>
</Col >


export const MovieModal = ({ show, edit, handleModal, onChange, formMovie, submit, setImage }) =>
    <Modal show={show} onHide={() => handleModal("movieModal", false)}>
        <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit Movie" : "Add new Movie"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit} >
            <Modal.Body>
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor="Title">Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="Title"
                            id="Title"
                            placeholder="Media item Title"
                            value={formMovie.Title}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="Year">Year</Form.Label>
                        <Form.Control
                            type="text"
                            name="Year"
                            id="Year"
                            placeholder="Relased Year"
                            value={formMovie.Year}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="Type">Type or Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="Type"
                            id="Type"
                            placeholder="Media item Type or category"
                            value={formMovie.Type}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>

                    <ImageUploader
                        withIcon={true}
                        buttonText="Upload Poster"
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        singleImage={true}
                        withPreview={true}
                        withLabel={false}
                        onChange={(image) => setImage(image)}
                    />

                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModal("movieModal", false)}>
                    Close
          </Button>
                <Button variant="primary" type="submit">
                    Save Changes
          </Button>
            </Modal.Footer>
        </Form>
    </Modal>


export const AdminList = ({ admins, viewAdmin }) =>
    <div className="mt-3" >
        <h5 >Admin List</h5>
        <Scrollbars style={{ height: "25vh" }}>
            <Table variant="dark" className="p-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} hover size="sm">
                <tbody >
                    {admins.map((admin, key) => <tr key={key} onClick={() => viewAdmin("currentAdmin", admin)}>
                        <td style={{ overflow: "hidden", height: "8vh", width: "8vh" }}> <Image style={{ objectFit: "contain", height: "100%" }} src={admin.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded /></td>
                        <td className=" text-white w-100">{admin.name} {admin.surname}</td>
                    </tr>)}
                </tbody>
            </Table>
        </Scrollbars>
    </div>


