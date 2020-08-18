import React from 'react'

const Actor = ({ actor }) => {
	return (
		<div className="mx-2 text-center">
			<h2 className="text-white text-xl font-bold tracking-wide mb-1">
				{actor.name}
			</h2>
			<img
				className="w-48"
				src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
				alt={actor.name}
			/>
		</div>
	)
}

export default Actor
