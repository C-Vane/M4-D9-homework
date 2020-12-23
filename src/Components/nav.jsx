/** @format */

import React from "react";
import {
  Navbar,
  ButtonGroup,
  Image,
  Nav,
  Dropdown,
  Button,
  Container,
  Row,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./nav.css";

const NavBar = (props) => {
  const { location, user } = props;
  console.log(user)
  if (location.pathname === '/registration' || location.pathname === "/" || location.pathname === "/signIn" || location.pathname === "/profile" || location.pathname === "/office") {
    return null
  }
  return (
    <Navbar className=" navbar-expand-lg navbar-dark mb-0" expand="lg">
      <Link to="/main">
        <Image
          style={{ height: "35px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
      </Link>
      <Container className="justify-content-end justify-content-lg-start">
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent" className="m">
          <Nav className="mr-auto">
            <Link to="/main" className="text-decoration-none">
              <div
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
              >
                Home
              </div>
            </Link>
            <Link to="/shows" className="text-decoration-none">
              <div
                className={
                  location.pathname === "/shows"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                TV Shows
              </div>
            </Link>
            <Link to="/movies" className="text-decoration-none">
              <div
                className={
                  location.pathname === "/movies"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Movies
              </div>
            </Link>
            <Link to="/new" className="text-decoration-none">
              <div
                className={
                  location.pathname === "/new" ? "nav-link active" : "nav-link"
                }
              >
                Recently Added
              </div>
            </Link>
            <Link to="/myList" className="text-decoration-none">
              <div
                className={
                  location.pathname === "/myList"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                My List
              </div>
            </Link>
          </Nav>

          <Nav>
            <Link to="/kids">
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.952font-weight: 400",
                  fontWeight: "400",
                }}
                className={
                  location.pathname === "/kids" ? "nav-link active" : "nav-link"
                }
              >
                KIDS
              </div>
            </Link>
            <div>
              <Dropdown as={ButtonGroup}>
                <Button variant="btn">
                  <div className="contain">
                    <Image
                      src={props.user.image || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"}
                    />
                  </div>
                </Button>
                <Dropdown.Toggle split variant="btn" id="dropdown-custom-2" />
                <Dropdown.Menu className="super-colors">
                  <Dropdown.Item eventKey="1" >
                    <Row>
                      <div className="mr-1 contain" >
                        <Image
                          src={props.user.image || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"}
                        /></div>
                      <span>{props.user.name ? props.user.name : "Strive Student"}</span></Row>
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="2"><Link to='/profile'>
                    <div className="text-white">Manage Profiles</div>
                  </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3"><Link to='/account'>
                    <div className="text-white">Account</div></Link></Dropdown.Item>
                  <Dropdown.Item eventKey="4">Help Center</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    <Link to="/" className="text-decoration-none">
                      <div className="text-white" onClick={props.logOut}>
                        Log Out
                      </div>
                    </Link>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(NavBar);
