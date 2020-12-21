import React from 'react'
import MovieItem from '../MovieItem'

function Results({ results, openPopup, history }) {
	return (
		<section className="results justify-content-center" >
			{results.map((movie, i) => (
				<MovieItem key={movie.imdbID + i} movie={movie} openPopup={openPopup} history={history} addclass='m-2' />
			))}
		</section>
	)
}

export default Results