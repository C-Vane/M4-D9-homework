import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { checkEmail, checkPassword, checkPostalCode } from '../../validationUntilites';
import { deleteFunction, getFunction, postFunction, putFunction, postFunctionImage } from '../CRUDFunctions';
import "../registrationPage/registration.css";
import { Admin, AdminList, AdminModal, Buttons, NavBar, DeleteModal, MovieModal, MovieList } from './backOfficeUtils'

class BackOffice extends React.Component {
    state = {
        adminModal: false,
        editAdmin: false,
        deleteAdmin: false,
        movieModal: false,
        editMovie: false,
        deleteMovie: false,
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
        },
        formMovie: {
            Poster: "",
            Title: "",
            Type: "",
            Year: "",
        },
        currentImage: [],
        loading: false,
        errMessage: "",
        errorsAdmin: {
            address: 0,
            city: 0,
            email: 0,
            name: 0,
            password: 0,
            postalCode: 0,
            surname: 0,
            yearOfBirth: 0,
        },
        inputs: true,
        passwordConfirm: ""
    }
    handleModal = (element, status, type, data) => {
        const state = { ...this.state };
        state[element] = status;
        state.formAdmin = element === "adminModal" && status ? { ...data } : {
            address: "",
            city: "",
            email: "",
            name: "",
            password: "",
            postalCode: "",
            role: "admin",
            surname: "",
            yearOfBirth: 0,
        }
        state.formMovie = (element === "movieModal" || element === "deleteMovie") && status ? { ...data } : {
            Poster: "",
            Title: "",
            Type: "",
            Year: "",
        }
        state.editAdmin = element === "adminModal" && type === "edit" ? true : false;
        state.editMovie = element === "movieModal" && type === "edit" ? true : false;
        this.setState(state)
    }
    componentDidMount = () => {
        this.getData("admins")
        this.getData("movies")
    }
    getData = async (endp) => {
        const response = await getFunction(endp === "admins" ? "user/admin" : "media/")
        if (response) {
            const state = { ...this.state }
            state[endp] = response
            this.setState(state)
        } else {
            console.log("error occured")
        }
    }
    onChange = (e) => {
        if (this.state.adminModal) {

            let formAdmin = { ...this.state.formAdmin }
            let currentId = e.currentTarget.id
            if (currentId === "passwordConfirm")
                this.setState({ passwordConfirm: e.currentTarget.value })
            else {
                formAdmin[currentId] = e.currentTarget.value
                this.setState({ formAdmin })
            }
        } else {
            let formMovie = { ...this.state.formMovie }
            let currentId = e.currentTarget.id
            formMovie[currentId] = e.currentTarget.value
            this.setState({ formMovie })
        }
    }
    current = (element, data) => {
        const state = { ...this.state }
        state[element] = data;
        this.setState(state)
    }
    validateFormAdmin = (e) => {
        let currentId = e.currentTarget.id
        const { passwordConfirm } = this.state
        let errorsAdmin = { ...this.state.errorsAdmin }
        let formAdmin = { ...this.state.formAdmin }
        let current = formAdmin[currentId]

        switch (currentId) {
            case 'name':
                errorsAdmin[currentId] = current.length <= 2 ? true : false;
                break;
            case 'surname':
                errorsAdmin[currentId] = current.length <= 3 ? true : false;
                break;

            case 'email':
                errorsAdmin[currentId] = checkEmail(current) ? false : true;
                break;
            case 'password':
                errorsAdmin[currentId] = checkPassword(current) ? false : true;
                break;
            case 'passwordConfirm':
                errorsAdmin[currentId] = passwordConfirm === formAdmin.password ? false : true;
                Object.keys(this.state.formAdmin).forEach((key) => {
                    if (this.state.formAdmin[key] !== '') {
                        currentId = key
                        current = formAdmin[currentId]
                        switch (currentId) {
                            case 'name':
                                errorsAdmin[currentId] = current.length <= 2 ? true : false;
                                break;
                            case 'surname':
                                errorsAdmin[currentId] = current.length <= 3 ? true : false;
                                break;
                            case 'email':
                                errorsAdmin[currentId] = checkEmail(current) ? false : true;
                                break;
                            case 'yearOfBirth':
                                errorsAdmin[currentId] = current <= 2002 && current >= 1910 ? false : true;
                                break;
                            case 'address':
                                errorsAdmin[currentId] = current.length <= 5 ? true : false;
                                break;
                            case 'city':
                                errorsAdmin[currentId] = current.length <= 2 ? true : false;
                                break;
                            case 'postalCode':
                                errorsAdmin[currentId] = checkPostalCode(current) ? false : true;
                                break;
                            case 'password':
                                errorsAdmin[currentId] = checkPassword(current) ? false : true;
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
                errorsAdmin[currentId] = current <= 2002 && current >= 1910 ? false : true;
                break;
            case 'address':
                errorsAdmin[currentId] = current.length <= 5 ? true : false;
                break;
            case 'city':
                errorsAdmin[currentId] = current.length <= 2 ? true : false;
                break;
            case 'postalCode':
                errorsAdmin[currentId] = checkPostalCode(current) ? false : true;
                break;
            default:
                console.log("Error occurd in Validation")
                this.setState({ errMessage: "Error in Validation" })
                break;
        }
        this.setState({ errorsAdmin })
        Object.values(errorsAdmin).every((el) => el === false) && this.setState({ inputs: false })
    }

    postSubmit = async (type) => {
        this.setState({ loading: true })
        const { formAdmin, formMovie, currentImage } = this.state
        const response = type === "admins" ? await postFunction("user/admin", formAdmin) : await postFunction("media", formMovie)
        if (response) {
            if (currentImage.length > 0) {
                let formData = new FormData();
                let blob = new Blob([currentImage[0]], { type: "img/jpeg" });
                formData.append("image", blob);
                type === "admins" ? await postFunctionImage("user/" + response._id + "/upload", formData) : await postFunctionImage("media/" + response.imdbID + "/upload", formData)
            }
            this.setState({
                currentAdmin: {},
                currentMovie: {},
                adminModal: false,
                movieModal: false,
                currentImage: [],
                loading: false,
                errMessage: "",
                errorsAdmin: {
                    address: 0,
                    city: 0,
                    email: 0,
                    name: 0,
                    password: 0,
                    postalCode: 0,
                    surname: 0,
                    yearOfBirth: 0,
                },
                inputs: true,
                passwordConfirm: ""
            })
            this.getData(type)

        } else {
            this.setState({ errMessage: response })
        }
    }
    editSubmit = async (type) => {
        this.setState({ loading: true })
        const { formAdmin, formMovie, currentImage } = this.state
        const response = type === "admins" ? await putFunction("user/admin/" + formAdmin._id, formAdmin) : await putFunction("media/" + formMovie.imdbID, formMovie)

        if (response) {
            if (currentImage.length > 0) {
                let formData = new FormData();
                let blob = new Blob([currentImage[0]], { type: "img/jpeg" });
                formData.append("image", blob);
                type === "admins" ? await postFunctionImage("user/" + formAdmin._id + "/upload", formData) : await postFunctionImage("media/" + formMovie._id + "/upload", formData)
            }
            this.setState({
                currentAdmin: {},
                currentMovie: {},
                adminModal: false,
                movieModal: false,
                editAdmin: false,
                editMovie: false,
                currentImage: [],
                loading: false,
                errMessage: "",
                errorsAdmin: {
                    address: 0,
                    city: 0,
                    email: 0,
                    name: 0,
                    password: 0,
                    postalCode: 0,
                    surname: 0,
                    yearOfBirth: 0,
                },
                inputs: true,
                passwordConfirm: ""
            })
            this.getData(type)
        } else {
            this.setState({ errMessage: response })
        }
    }
    deleteSubmit = async (type) => {
        this.setState({ loading: true, })
        const { currentAdmin, formMovie } = this.state
        const response = type === "admin" ? await deleteFunction("user/" + currentAdmin._id) : await deleteFunction("media/" + formMovie.imdbID)
        if (response.ok) {
            this.getData(type === "admin" ? "admins" : "media")

            this.setState({ loading: false, formMovie: {}, deleteAdmin: false, deleteMovie: false })
        } else {
            this.setState({ errMessage: response })
        }
    }
    formSubmit = (e) => {
        e.preventDefault()
        const { editAdmin, adminModal, movieModal, editMovie } = this.state
        if (adminModal) {
            editAdmin ? this.editSubmit("admins") : this.postSubmit("admins")
        }
        if (movieModal) {
            editMovie ? this.editSubmit("movie") : this.postSubmit("movie")
        }
    }


    setImage = (image) => this.setState({ currentImage: image })
    render() {
        const { logOut, admin } = this.props
        const { adminModal, passwordConfirm, admins, currentAdmin, editAdmin, formAdmin, inputs, errorsAdmin, deleteAdmin, movies, deleteMovie, movieModal, formMovie, editMovie, } = this.state
        return <div className="background text-white">
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

                <Row>
                    <MovieList movies={movies} handleModal={this.handleModal} />
                </Row>

                <AdminModal show={adminModal} edit={editAdmin} handleModal={this.handleModal} onChange={this.onChange} formAdmin={formAdmin} validateForm={this.validateFormAdmin} desabled={inputs} errors={errorsAdmin} submit={this.formSubmit} setImage={this.setImage} passwordConfirm={passwordConfirm} />
                <MovieModal show={movieModal} edit={editMovie} handleModal={this.handleModal} onChange={this.onChange} formMovie={formMovie} submit={this.formSubmit} setImage={this.setImage} />
                <DeleteModal show={deleteAdmin || deleteMovie} type={deleteAdmin ? "admin" : "movie"} handleModal={this.handleModal} deleteFunction={this.deleteSubmit} />
            </Container>
        </div>
    }
}

export default BackOffice