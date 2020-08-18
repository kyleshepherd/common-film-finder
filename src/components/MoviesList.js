import React from 'react'
import Movie from './Movie'

const MoviesList = ({ actorOne, actorTwo, sharedMovies }) => {
	return (
		<div className="max-w-xl mx-auto mt-4">
			{sharedMovies.length > 0 ? (
				<>
					<div className="text-center text-white font-semibold tracking-wide text-2xl">
						{actorOne.name} and {actorTwo.name} have been in{' '}
						{sharedMovies.length} film{sharedMovies.length > 1 ? 's' : null}{' '}
						together...
					</div>
					<div className="mt-6">
						{sharedMovies.map(movie => {
							return <Movie movie={movie} key={movie.id} />
						})}
					</div>
				</>
			) : (
				<div className="text-center text-white font-semibold tracking-wide text-2xl">
					{actorOne.name} and {actorTwo.name} haven't been in a film together,
					yet...
				</div>
			)}
		</div>
	)
}

export default MoviesList
