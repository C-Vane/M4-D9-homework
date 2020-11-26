import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Carousel, Row, Spinner } from 'react-bootstrap';
import MovieItem from './MovieItem';
import PropTypes from 'prop-types';


class carouselItem extends React.Component {
    state = {
        movies: [],
        index: 0,
        loading: true,
    }
    url = "http://www.omdbapi.com/?apikey=ff133ca5&s="
    pages = ['1', '2', '3']

    componentDidMount = () => {
        const { Title } = this.props
        this.pages.forEach(page => this.fetchMovies(Title, page));
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 1000);

    }

    fetchMovies = async (Title, page) => {
        try {
            let response = await fetch(this.url + Title + "&page" + page);

            if (response.ok) {
                let movies_list = await response.json();
                let movies = [[...this.state.movies], [movies_list.Search]].flat();
                this.setState({
                    movies: movies,
                })
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }



    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    }

    render() {
        const { Title, history } = this.props;
        const { index, movies, loading } = this.state;
        return (
            <>
                <h4 className="text-white ml-5 mt-3 font-weight-bolder">{Title}</h4>
                { loading ?
                    <Row className="ml-2 d-flex justify-content-center ">
                        <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Row>
                    :
                    <Carousel activeIndex={index} onSelect={this.handleSelect} indicators={false}>

                        < Carousel.Item >
                            <Row>
                                {movies.flat().map((single_movie, i) => {
                                    if (i < 6) {
                                        if (i > 0 && i < 2) return <MovieItem movie={single_movie} history={history} addclass="mobile"></MovieItem>
                                        else if (i > 1 && i < 4) return <MovieItem movie={single_movie} history={history} addclass="tablet"></MovieItem>
                                        else if (i > 3) return <MovieItem movie={single_movie} history={history} addclass="desktop"></MovieItem>
                                        else return <MovieItem movie={single_movie} history={history} ></MovieItem>
                                    }
                                })
                                }
                            </Row>

                        </Carousel.Item>
                        < Carousel.Item >
                            <Row>
                                {movies.flat().map((single_movie, i) => {
                                    if (i > 6 && i < 13) {
                                        if (i > 7 && i < 9) return <MovieItem movie={single_movie} history={history} addclass="mobile"></MovieItem>
                                        else if (i > 8 && i < 11) return <MovieItem movie={single_movie} history={history} addclass="tablet"></MovieItem>
                                        else if (i > 10) return <MovieItem movie={single_movie} history={history} addclass="desktop"></MovieItem>
                                        else return <MovieItem movie={single_movie} history={history} ></MovieItem>
                                    }
                                })
                                }
                            </Row>

                        </Carousel.Item>
                        < Carousel.Item >
                            <Row>
                                {movies.flat().map((single_movie, i) => {
                                    if (i > 12 && i < 19) {
                                        if (i > 13 && i < 15) return <MovieItem movie={single_movie} history={history} addclass="mobile"></MovieItem>
                                        else if (i > 14 && i < 17) return <MovieItem movie={single_movie} history={history} addclass="tablet"></MovieItem>
                                        else if (i > 16) return <MovieItem movie={single_movie} history={history} addclass="desktop"></MovieItem>
                                        else return <MovieItem movie={single_movie} history={history} ></MovieItem>
                                    }
                                })
                                }
                            </Row>

                        </Carousel.Item>

                    </Carousel>
                }
            </>
        )
    }
}

carouselItem.propTypes = { Title: PropTypes.string, history: PropTypes.object };



export default carouselItem;