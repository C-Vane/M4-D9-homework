import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import './card.css'


class MovieItem extends React.Component {

    render() {
        const { movie, history, addclass } = this.props;
        const addclasses = ("col-sm-12 col-md-6 col-lg-2 p-1 text-center ").concat(addclass);
        return (

            <div key={movie.imdbID} className={addclasses} style={{ height: '350px' }} onClick={() => this.props.history.push('/details/' + movie.imdbID)}>
                <Image src={movie.Poster} fluid />
                <div className="details text-left col-sm-12">
                    <p className="title text-nowrap m-0">{movie.Title}</p>
                    <p className="text-black-50 font-weight-bold m-0">{movie.Type}</p>
                    <p className="text-white-50 m-0 ">{movie.Year}</p>
                </div>
            </div>

        )
    }
}

MovieItem.propTypes = { movie: PropTypes.object, history: PropTypes.object };



export default MovieItem;