import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import { Spinner, Container, Row } from 'react-bootstrap';
import Results from './Results'

class TvShows extends React.Component {
    state = {
        loading: true,
        movies: [],
    }
    url = "http://www.omdbapi.com/?apikey=ff133ca5&";
    pages = ['1', '2', '3', '4', '5']
    componentDidMount = () => {
        this.pages.forEach(page => this.fetchMovies(page));
        console.log(this.state)
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }
    fetchMovies = async (page) => {
        try {
            let response = await fetch(this.url + this.props.series + "&page=" + page);
            console.log(page)
            if (response.ok) {
                let movies_list = await response.json();
                let movies = [[...this.state.movies], [movies_list.Search]].flat();
                this.setState({
                    movies: movies.flat(),
                })
                console.log(this.state.movies)
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }

    render() {
        const { movies, loading } = this.state
        const { history } = this.props
        return <div>
            {loading ? <Row className="ml-2 d-flex justify-content-center ">
                <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row> : <Results results={movies} history={history} />
            }
        </div>;
    }

}
TvShows.propTypes = { series: PropTypes.string }

export default TvShows;