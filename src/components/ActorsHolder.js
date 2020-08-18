import React from 'react'
import Actor from './Actor'

const ActorsHolder = ({ actorOne, actorTwo }) => {
	return (
		<div className="max-w-xl mx-auto flex justify-between mt-6">
			<Actor actor={actorOne} />
			<Actor actor={actorTwo} />
		</div>
	)
}

export default ActorsHolder
