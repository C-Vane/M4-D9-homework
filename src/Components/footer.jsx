import React from "react";
import { Row, Col } from "react-bootstrap";
// import { AiFillFacebook } from "react-icons/ai";
// import { AiFillInstagram } from "react-icons/ai";
// import { AiOutlineTwitter } from "react-icons/ai";
// import { AiFillYoutube } from "react-icons/ai";

const Footer = () => (
  <footer>
    <Row className="text-center mt-5">
      <Col xs={{ span: 5, offset: 3 }}>
        <Row>
          {/* <Col xs={12} className="text-left ">
             <AiFillFacebook
              size={22}
              style={{ marginRight: "5px", color: " #8a8a8a" }}
            />
            <AiFillInstagram
              size={23}
              style={{ marginRight: "5px", color: " #8a8a8a" }}
            />
            <AiOutlineTwitter
              size={25}
              style={{ marginRight: "5px", color: " #8a8a8a" }}
            />
            <AiFillYoutube size={24} style={{ color: " #8a8a8a" }} />
          </Col> */}
        </Row>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p>
                  <a href="/" alt="footer link">
                    Audio and Subtitles
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Media Center
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Privacy
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Contact us
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p>
                  <a href="/" alt="footer link">
                    Audio Description
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Investor Relations
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Legal Notices
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p>
                  <a href="/" alt="footer link">
                    Help Center
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Jobs
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Cookie Preferences
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p>
                  <a href="/" alt="footer link">
                    Gift Cards
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Terms of Use
                  </a>
                </p>
                <p>
                  <a href="/" alt="footer link">
                    Corporate Information
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-left mb-2">
            <button
              type="button"
              className="btn btn-sm footer-button rounded-0 mt-3"
            >
              Service Code
            </button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-left mb-2 mt-2 copyright">
            © 1969-2420 Blyatflix
          </Col>
        </Row>
      </Col>
    </Row>
  </footer>
);

export default Footer;
