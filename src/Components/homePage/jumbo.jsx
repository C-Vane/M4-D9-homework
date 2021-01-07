/** @format */

import React from "react";
import { Jumbotron, Container, Image, Button, Row } from "react-bootstrap";
import "../../App.css";
import Jumbovid from "../../assets/jumbovid.mp4";
import '../mediaPage/relatedMovies.css'
//import ReactPlayer from "react-player/youtube";

class Jumbo extends React.Component {
  render() {
    return (
      <Jumbotron
        fluid
        className="p-0 jumbotron"
        id="jumbotron"
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >

        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: "relative",
            width: "100%",
            height: "120vh",
            overflow: "hidden",
          }}
        >
          <video
            src={Jumbovid}
            autoPlay
            muted
            loop
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "25vh",
            }}
          ></video>
          <Container
            style={{ width: "100%", height: "100%", marginTop: "40%", zIndex: "+1", position: "absolute" }}
          >
            <Row>
              <Image
                src="https://image.flaticon.com/icons/png/512/870/870910.png"
                height="50px"
              />
              <h2 className="movie_type mt-2">Series</h2>
            </Row>
            <Row>
              <Image
                src="https://cdn.discordapp.com/attachments/769227650328821771/781488373763801118/the-crown-tv-fanart-fanarttv-the-crown-png-800_310.png"
                height="200px"
              />
            </Row>
            <Row>
              <Button variant="dark">Play</Button>
              <Button variant="dark">More Info</Button>
            </Row>
          </Container>
        </div>

        <div
          className="gradientOnJumbo"
          style={{
            content: "",
            background:
              "linear-gradient(180deg, rgba(20, 20, 20, 0) 34%, rgba(20, 20, 20, 1) 100%)",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "0",
          }}
        ></div>
        <div
          className="gradientOnJumbo"
          style={{
            content: "",
            background:
              "linear-gradient(270deg, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1))",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "50%",
            zIndex: "0",
          }}
        ></div>

      </Jumbotron>
    );
  }
}

export default Jumbo;
