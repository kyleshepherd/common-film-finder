import React from 'react'
import ErrorNotices from './components/ErrorNotices'
import Header from './components/Header'
import SearchBars from './components/SearchBars'
import tmdb from './apis/tmdb'

class App extends React.Component {
	state = { actorOneId: '', actorTwoId: '', errors: [] }

	onActorsSubmit = async (actorOneName, actorTwoName) => {
		this.setState({ errors: [] })
		const newErrors = []

		const actorOneId = this.getActorId(actorOneName)

		if (!actorOneId) {
			console.log('no actor found')
			newErrors.push(`Couldn't find an actor named ${actorOneName}`)
		}

		const actorTwoId = this.getActorId(actorTwoName)

		if (!actorTwoId) {
			console.log('actor two bork')
			newErrors.push(`Couldn't find an actor named ${actorTwoName}`)
		}

		if (newErrors !== []) {
			this.setState({ error: newErrors })
			return
		}

		// const actorOneMoviesResponse = await tmdb.get(
		// 	`/person/${actorOneIdResponse.data.results[0].id}/movie_credits`,
		// 	{
		// 		params: {
		// 			api_key: '982b666644941aee3e5b5bd88d7569d4',
		// 		},
		// 	}
		// )

		// console.log(actorOneMoviesResponse)
	}

	getActorId = async actorName => {
		const actorIdResponse = await tmdb.get('/search/person', {
			params: {
				query: actorName,
				api_key: '982b666644941aee3e5b5bd88d7569d4',
			},
		})

		if (actorIdResponse.data.results.length < 1) {
			console.log('Cannot find actor named', actorName)
			return false
		}

		return actorIdResponse.data.results[0].id
	}

	render() {
		return (
			<div className="bg-blue-800 h-screen p-2">
				<Header />
				<SearchBars onActorsSubmit={this.onActorsSubmit} />
				<ErrorNotices errors={this.state.errors} />
			</div>
		)
	}
}

export default App
