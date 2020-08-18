import React from 'react'
import ErrorNotices from './components/ErrorNotices'
import Header from './components/Header'
import SearchBars from './components/SearchBars'
import tmdb from './apis/tmdb'
import Spinner from './components/Spinner'
import ActorsHolder from './components/ActorsHolder'

class App extends React.Component {
	state = {
		actorOne: {},
		actorTwo: {},
		sharedMovies: [],
		errors: [],
		queried: false,
		loading: false,
	}

	onActorsSubmit = async (actorOneName, actorTwoName) => {
		this.setState({
			errors: [],
			sharedMovies: [],
			queried: false,
			loading: true,
			actorOne: {},
			actorTwo: {},
		})
		const newErrors = []

		const actorOne = await this.getActor(actorOneName)

		if (!actorOne.id) {
			newErrors.push(`Couldn't find an actor named ${actorOneName}`)
		}

		const actorTwo = await this.getActor(actorTwoName)

		if (!actorTwo.id) {
			newErrors.push(`Couldn't find an actor named ${actorTwoName}`)
		}

		if (actorOne.id === actorTwo.id) {
			newErrors.push('Both actors cannot be the same')
		}

		if (newErrors.length > 0) {
			this.setState({ errors: newErrors })
			return
		}

		this.setState({ actorOne, actorTwo })

		const actorOneMovies = await this.getActorMovieCredits(actorOne.id)

		const actorTwoMovies = await this.getActorMovieCredits(actorTwo.id)

		const shared = []

		actorOneMovies.forEach(actorOneMovie => {
			actorTwoMovies.forEach(actorTwoMovie => {
				if (actorOneMovie.id === actorTwoMovie.id) {
					shared.push(actorOneMovie.id)
				}
			})
		})

		this.setState({ sharedMovies: shared, queried: true, loading: false })
	}

	getActor = async actorName => {
		const actorIdResponse = await tmdb.get('/search/person', {
			params: {
				query: actorName,
				api_key: '982b666644941aee3e5b5bd88d7569d4',
			},
		})

		if (actorIdResponse.data.results.length < 1) {
			return false
		}

		return actorIdResponse.data.results[0]
	}

	getActorMovieCredits = async actorId => {
		const actorMoviesResponse = await tmdb.get(
			`/person/${actorId}/movie_credits`,
			{
				params: {
					api_key: '982b666644941aee3e5b5bd88d7569d4',
				},
			}
		)

		return actorMoviesResponse.data.cast
	}

	render() {
		return (
			<div className="bg-blue-800 min-h-screen p-2">
				<Header />
				<SearchBars
					onActorsSubmit={this.onActorsSubmit}
					loading={this.state.loading}
				/>
				<ErrorNotices errors={this.state.errors} />
				{this.state.loading ? (
					<Spinner />
				) : (
					<>
						{this.state.queried ? (
							<>
								{this.state.actorOne && this.state.actorTwo ? (
									<ActorsHolder
										actorOne={this.state.actorOne}
										actorTwo={this.state.actorTwo}
									/>
								) : null}
							</>
						) : null}
					</>
				)}
			</div>
		)
	}
}

export default App
