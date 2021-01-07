import React, { useState } from 'react';
import { Image, Nav, Button, Row, Col, Alert, FormGroup, Form, FormControl, FormLabel, Container } from 'react-bootstrap';
import ImageUploader from "react-images-upload";
import { Link } from 'react-router-dom';
import { deleteFunction, postFunctionImage } from '../CRUDFunctions';
import './profile.css';

const ProfilePage = (props) => {
    const [user, setUser] = useState(props.user)
    const [imageUpload, setImageUpload] = useState(false)
    const [image, setImage] = useState()
    const [msg, setMsg] = useState()

    //const getUser = () => { }
    const updateImage = async () => {
        setImageUpload(false)
        let formData = new FormData();
        let blob = new Blob([image[0]], { type: "img/jpeg" });
        formData.append("image", blob);
        await postFunctionImage("user/" + user._id + "/upload", formData)
        setUser(props.getId(user._id))
    }
    //const updateUser = () => { }
    const deleteProfile = async () => {
        const response = await deleteFunction("user/" + user._id);
        setMsg(response)
        setTimeout(() => {
            setMsg("")
        }, 2000);
        props.logOut()
    }

    return <div id="profile">
        <Nav>
            <Link to="/main">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix-font"
                    style={{ backgroundColor: "transparent" }} width="150px" /></Link>
        </Nav>
        {msg && <Alert>{msg}</Alert>}
        <div id="profile">
            <h1>Edit Profile</h1>

            <Container>

                <Row>
                    <Col md={3} id="divprof">
                        <div className="userimg">
                            <Image src={user.image || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"} alt="user profile" /></div>
                        <div onClick={() => setImageUpload(true)} style={{ position: "relative", top: "-1.5rem", left: "0.5rem" }}>
                            <i className="fas fa-upload "></i>
                        </div>
                        {imageUpload &&
                            <div className="upload-container swing-in-top-fwd">
                                <h5 className="font-weight-normal">Upload Image</h5>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Upload image"
                                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    withPreview={true}
                                    withLabel={false}
                                    onChange={(image) => setImage(image)}
                                />
                                <div className="d-flex justify-content-center align-items-center" style={{ height: 30 }}>
                                    <Button
                                        variant="outline-secondary"
                                        className="mr-2"
                                        onClick={() => setImageUpload(false)}
                                        style={{ width: "40%" }}
                                    > Cancel </Button>
                                    <Button
                                        variant="outline-primary"

                                        style={{ width: "60%" }}
                                        onClick={updateImage}
                                    > Save Changes </Button>
                                </div>
                            </div>
                        }
                    </Col>
                    <Col sm={9}>
                        <Form>

                            <FormGroup as={Row}>
                                <FormControl className="pb-2 mt-2" type="text" id="name" defaultValue={user.name || "Strive Student"} readOnly />
                            </FormGroup>

                            <FormGroup as={Row}>
                                <FormLabel htmlFor="google_translate_element">Language:
                                        <div id="google_translate_element" className="language">
                                    </div>
                                </FormLabel>

                            </FormGroup>


                            <FormGroup as={Row}>
                                <FormLabel htmlFor="maturity">Maturity Settings:
                                        <FormControl type="text" id="maturity"
                                        value="ALL MATURITY RATINGS" />
                                    <span> Show titles of all maturity ratings for this profile.</span>
                                </FormLabel>

                            </FormGroup>

                            <Button id="edit" className="mt-4 ml-3" variant="secondary">Edit</Button>

                            <section id='section3'>

                                <div className="form-group row">
                                    <label> Autoplay constols</label>
                                    <label className="checkbox">Autoplay next episode in a series on all devices.
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="form-group row">
                                    <label className="checkbox">Autoplay previews while browsing on all devices.
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>


                            </section>
                        </Form>
                    </Col>
                </Row>
                <Container>
                    <Link to="/main">
                        <Button variant="primary">SAVE</Button></Link>
                    <Button onClick={() => setUser(props.user)} variant="secondary">CANCEL</Button>
                    <Button variant="secondary" className="d-none" onClick={deleteProfile}>DELETE PROFILE</Button>
                </Container>
            </Container>

        </div>
    </div>;
}


export default ProfilePage;