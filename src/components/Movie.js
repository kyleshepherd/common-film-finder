import React from 'react'
import moment from 'moment'

const Movie = ({ movie }) => {
	return (
		<div className="flex mb-10">
			<div className="mr-12">
				{movie.poster_path ? (
					<img
						className="w-48"
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={`${movie.title} poster`}
					/>
				) : (
					<svg
						className="w-48"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path
							style={{ fill: '#ffffff' }}
							fillRule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>

			<div>
				<h2 className="text-white font-semibold tracking-wide text-xl">
					{movie.title}
				</h2>
				{movie.release_date ? (
					<h3 className="text-white font-semibold tracking-wide">
						({moment(movie.release_date).format('YYYY')})
					</h3>
				) : null}
			</div>
		</div>
	)
}

export default Movie
