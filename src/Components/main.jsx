import React from 'react';
import CarouselItem from './CarouselItem';
import { Container, Spinner, Row } from 'react-bootstrap';
import Jumbo from "./jumbo";
import SearchInput from "./SearchInput"
import Results from "./Results"

class Main extends React.Component {
    state = {
        movies: [],
        searching: false,
        loading: true,
        search: "",
    }
    handleInput = (e) => {
        let search = e.target.value;
        this.setState({ searching: false })
        this.setState(prevState => {
            return { ...prevState, search, searching: false }
        });
    }
    url = "http://www.omdbapi.com/?apikey=ff133ca5&s=";

    search = (e) => {
        if (e.key === "Enter") this.fetchMovies(this.state.search)
    };
    fetchMovies = async (Title) => {
        this.setState({ searching: true })
        try {
            let response = await fetch(this.url + Title);
            if (response.ok) {
                let movies = await response.json();
                setTimeout(() => {
                    this.setState({
                        movies: movies.Search,
                        loading: false,
                    })
                }, 1000);
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ searching: false })
        }
    }
    movie_keys = ['Avengers', 'Spider-man', 'Batman']
    render() {

        const { movies, searching, loading } = this.state;
        const { history } = this.props;
        return <>
            <SearchInput handleInput={this.handleInput} search={this.search} />
            {!searching ? (
                <>
                    <Jumbo />
                    {this.movie_keys.map((movie) => <CarouselItem key={movie} Title={movie} history={history} ></CarouselItem>)}
                </>
            ) : (<Container>
                { loading ? <Row className="ml-2 d-flex justify-content-center ">
                    <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row> :
                    <Results results={movies} openPopup={this.openPopup} history={history} />
                }
            </Container>)
            }


        </>
    }
}

export default Main;



