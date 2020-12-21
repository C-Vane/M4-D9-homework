
import React from 'react';
import { Image, Nav, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../registrationPage/registration.css";

class LandigPage extends React.Component {
    render() {
        return <div className="background">
            <Nav>
                <Link to="/">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix-font"
                        style={{ backgroundColor: "transparent" }} width="200px" /></Link>
                <Link to="/signIn">
                    <Button className="btns" style={{ position: "absolute", right: 0 }} >Sign In</Button></Link>
            </Nav>
            <Col className="showcase-content">
                <h1>See what's next</h1>
                <p>Watch anywhere - Cancel anytime</p>
                <div className="largescreen">
                    <span>Ready to watch? Create or Restart your membership.</span>
                    <Link to="/registration">
                        <Button className="btns btn-xl">TRY 30 DAYS FREE</Button>
                    </Link>
                    <span>Only new members are eligible for this offer.</span>
                </div>
                <div className="smallscreen">
                    <Link to="/registration">
                        <Button className="btns btn-xl">WATCH FREE FOR 30 DAYS</Button>
                    </Link>
                </div>
            </Col>


        </div>
    }
}

export default LandigPage