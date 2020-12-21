/** @format */

import React from "react";
import {
  Navbar,
  ButtonGroup,
  Image,
  Nav,
  Dropdown,
  DropdownButton,
  Button,
  Container,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./nav.css";

const NavBar = (props) => {
  const { location } = props;
  if (props.location.pathname === '/registration' || props.location.pathname === "/" || props.location.pathname === "/signIn") {
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
      <Container>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
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
                  {" "}
                  <Image
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                    width="30"
                  />
                </Button>
                <Dropdown.Toggle split variant="btn" id="dropdown-custom-2" />
                <Dropdown.Menu className="super-colors">
                  <Dropdown.Item eventKey="1">
                    <Image
                      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                      width="30"
                      height="30"
                    />{" "}
                    Strive Student
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">Manage Profiles</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3">Account</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Help Center</Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                    <Link to="/registration" className="text-decoration-none">
                      <div
                        className={
                          location.pathname === "/myList"
                            ? "nav-link active"
                            : "nav-link"
                        }>
                        Register to Netflix
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
