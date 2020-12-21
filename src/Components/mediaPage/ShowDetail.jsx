/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Image, Jumbotron, Badge } from "react-bootstrap";
import Comments from "./Comments";
import Results from "../homePage/Results";
import RelatedMovies from "./RelatedMovies";

class ShowDetail extends React.Component {
  state = {
    movie: {},
    loaded: false,
  };
  url = "http://www.omdbapi.com/?apikey=ff133ca5&";
  load = () => {
    let movie_id = "i=" + this.props.match.params.id;
    this.fetchMovie(movie_id, 0);
  };
  constructor(props) {
    super(props);
    this.load();
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
    try {
      let response = await fetch(this.url + id);

      if (response.ok) {
        let movie = await response.json();
        console.log(movie);
        return type === 0
          ? this.setState({ movie, loaded: true })
          : movie.Search;
      }
    } catch (e) {
      console.log("error happened, that's life", e);
      this.setState({ loading: false });
    }
  };

  render() {
    const { movie } = this.state;
    const { id } = this.props.match.params;
    return (
      <>
        <Jumbotron
          fluid
          className="text-white"
          style={{
            width: "100%",
            height: "90vh",
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
                  <p className="text-white">
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
            <Comments id={id} />
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
