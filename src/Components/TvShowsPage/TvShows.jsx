import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Container, Row } from 'react-bootstrap';
import Results from '../homePage/Results'

class TvShows extends React.Component {
    state = {
        loading: true,
        movies: [],
    }
    url = "https://www.omdbapi.com/?apikey=ff133ca5&";
    pages = ['1', '2', '3', '4', '5']
    componentDidMount = () => {
        this.pages.forEach(page => this.fetchMovies(page));
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }
    fetchMovies = async (page) => {
        try {
            let response = await fetch(this.url + this.props.series + "&page=" + page);
            if (response.ok) {
                let movies_list = await response.json();
                let movies = [[...this.state.movies], [movies_list.Search]].flat();
                this.setState({
                    movies: movies.flat(),
                })
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }

    render() {
        const { movies, loading } = this.state
        const { history } = this.props
        return <Container>
            <h1 className="text-white-50">Tv Shows</h1>
            {loading ? <Row className="ml-2 d-flex justify-content-center ">
                <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row> : <Results results={movies} history={history} />
            }
        </Container>;
    }

}
TvShows.propTypes = { series: PropTypes.string }

export default TvShows;