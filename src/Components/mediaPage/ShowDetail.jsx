/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Image, Jumbotron, Badge, Button } from "react-bootstrap";
import Comments from "./Comments";
import Results from "../homePage/Results";
import RelatedMovies from "./RelatedMovies";
import { getFunction, postFunction, deleteFunction } from "../CRUDFunctions";

class ShowDetail extends React.Component {
  state = {
    movie: {},
    loaded: false,
    rate: false,
    myList: false,
  };



  constructor(props) {
    super(props);
    this.fetchMovie(this.props.match.params.id, 0);
    this.fetchMyList()
  }
  related = () => {
    const { movie, loaded } = this.state;
    const { history } = this.props;
    if (loaded === true) {
      return (
        <>
          {movie.Type === "movie" ? (
            <RelatedMovies history={history} Type="0" Id={movie.Title} />
          ) : (
              <RelatedMovies history={history} Type="1" Id={movie.imdbID} />
            )}
        </>
      );
    }
  };
  fetchMovie = async (id, type) => {

    let response = await getFunction("media/" + id);
    if (response) {
      return type === 0
        ? this.setState({ movie: response, loaded: true })
        : response.Search;
    }

  };
  addToList = async () => {
    const response = await postFunction("user/" + this.props.user._id + "/myList/" + this.props.match.params.id)
    if (response) {
      this.setState({ myList: true })
    }
  }
  removeFromList = async () => {
    const response = await deleteFunction("user/" + this.props.user._id + "/myList/" + this.props.match.params.id)
    if (response) {
      this.setState({ myList: false })
    }
  }
  fetchMyList = async () => {
    const response = await getFunction("user/" + this.props.user._id + "/myList")
    if (response) {
      const added = response.find((id) => id === this.props.match.params.id)
      this.setState({ myList: added })
    }
  }
  rateMovie = () => this.setState({ rate: !this.state.rate })

  render() {
    const { movie, rate, myList } = this.state;
    const { id } = this.props.match.params;
    return (
      <>
        <Jumbotron
          fluid
          className="text-white"
          style={{
            width: "100%",
            minHeight: "90vh",
            position: "relative",
            backgroundImage: "url(" + movie.Poster + ")",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            paddingTop: "15vh",
          }}
        >
          <Container
            style={{ width: "100%", height: "100%", marginTop: "10vh", zIndex: "1" }}
          >
            <div>
              <Image
                src="https://image.flaticon.com/icons/png/512/870/870910.png"
                height="25px"
              />
              <span className="movie_type">
                {movie.Type}
              </span>
              <h1 className="big-title">{movie.Title}</h1>
            </div>

            <Col lg={5} md={6} className="mt-5">
              <h3>{movie.Title}</h3>
              <Row className="justify-content-around">
                <small className=" font-weight-bold text-success">
                  {movie.Metascore}% Match
                </small>
                <small className=" font-weight-bold text-muted">
                  {movie.Type}
                </small>
                <small className=" font-weight-bold text-muted">
                  {movie.Year}
                </small>
                <Badge variant="dark">{movie.Rated}</Badge>
                <Badge variant="dark">HD</Badge>
                <Badge variant="secondary">{movie.imdbRating}</Badge>
              </Row>
              <Row>
                <div className="plot mt-2">
                  <p className=" text-white">{movie.Plot}</p>
                  <Row>
                    <Button as={Col} variant="btn" className="btns m-2">Play</Button>
                    <Button as={Col} variant="outline-light" className="m-2 rounded-0" active={myList} onClick={myList ? this.removeFromList : this.addToList}>{myList ? "✓" : "+"} My List</Button>
                    <Button as={Col} variant="outline-light" className="m-2 rounded-0" onClick={this.rateMovie}>Rate</Button>
                  </Row>
                  <p className="text-white mt-3">
                    <span className="text-muted">Staring:</span > {movie.Actors}
                  </p>
                  <p className="text-white">
                    <span className="text-muted">Creator:</span > {movie.Writer}
                  </p>
                </div>
              </Row>
            </Col>
          </Container>
          <div
            className="gradientOnJumbo"
            style={{
              content: "",
              background: "rgb(20, 20, 20)",
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
        <Container>
          <Col>
            <Comments id={id} userId={this.props.user._id} rate={rate} rated={this.rateMovie} />
          </Col>
          <Row id="related">
            <h2 className="text-white-50">More TV Shows & Movies</h2>
            {this.related()}
          </Row>
        </Container>
      </>
    );
  }
}

ShowDetail.propTypes = { id: PropTypes.string };

// #endregion

export default ShowDetail;
