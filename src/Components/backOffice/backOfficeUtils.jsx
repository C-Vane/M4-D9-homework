import { Image, Nav, Button, Form, Col, Row, Card, ListGroup, Table } from 'react-bootstrap';
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
export const Admin = (props) => {
    const { name, surname, email, role } = props.user;
    return (
        <>
            <h3>Admin</h3>
            <Row style={{ height: "30vh" }}>
                <Col sm={4} className="pr-5" style={{ overflow: "hidden", height: "30vh" }} >
                    <Image style={{ objectFit: "contain", height: "100%" }} src={props.user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded />
                </Col>
                <Col sm={8}>
                    <div className="register m-0 p-0 ml-2 pl-3" >
                        <div className="text-white mt-3 px-4">
                            <Row className="justify-content-between py-2 m-auto">Name: <strong>{name + " " + surname}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">E-mail:<strong>{email}</strong></Row>
                            <Row className="justify-content-between py-2 m-auto">Role:<strong>{role}</strong></Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export const Buttons = (props) => <Row>
    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => props.handleModal("admin", false)}>Add Admin</Button>

    <Button as={Col} className="mx-1" variant={"outline-light"} onClick={() => props.handleModal("movie", false)}>Add Movie</Button>
</Row >
const adminModal = {}
const movieModal = {}
const movieTable = {}
export const adminList = (props) =>
    <div>
        <h5>Admin List</h5>
        <Table hover size="sm">

            <tbody>
                {props.admin.map(() => <tr onClick={() => props.viewAdmin(props.admin.id)}>
                    <td> <Image style={{ objectFit: "contain", height: "100%" }} src={props.admin.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} rounded /></td>
                    <td>{props.admin.name}</td>
                </tr>)}
            </tbody>
        </Table>
    </div>


