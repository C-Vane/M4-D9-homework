import React from 'react';
import Results from '../homePage/Results';
import './relatedMovies.css'

class RelatedMovies extends React.Component {
    state = {
        related_movies: [],
        episodes: [],
        loading: true,
    }
    url = "https://www.omdbapi.com/?apikey=ff133ca5&"
    fetchMovies = async (id, type) => {
        try {
            let response = await fetch(this.url + id);

            if (response.ok) {
                let movie = await response.json();
                this.setState({ loaded: true })
                if (type === '0') return this.setState({ related_movies: movie.Search, loading: false });
                else {
                    let episodes = [], resp, resp_json;
                    movie.Episodes.forEach(async m => {
                        resp = await fetch(this.url + "i=" + m.imdbID);
                        if (resp.ok) {
                            resp_json = await resp.json();
                            episodes.push(resp_json);
                        }
                    });
                    return this.setState({ episodes, loading: false });
                }
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }
    constructor(props) {
        super(props);
        if (props.Type === "1") {
            this.fetchMovies("i=" + props.Id + "&Season=1", props.Type);
        }
    }
    componentDidMount = () => {
        const { Id, Type } = this.props
        if (Type === "0") {
            this.fetchMovies(Id.startsWith("The") ? "s=" + Id.split(" ")[1] : "s=" + Id.split(" ")[0], Type);
        }
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 1000);

    }

    render() {
        const { Type, history } = this.props;
        const { related_movies, episodes } = this.state;

        return <div>{Type === '0' ? <Results history={history} results={related_movies}></Results> : <Results history={history} results={episodes}></Results>}</div>;
    }
}


export default RelatedMovies;