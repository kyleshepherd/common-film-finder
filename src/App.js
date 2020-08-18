import React from 'react'
import ErrorNotices from './components/ErrorNotices'
import Header from './components/Header'
import SearchBars from './components/SearchBars'
import tmdb from './apis/tmdb'
import Spinner from './components/Spinner'

class App extends React.Component {
	state = { sharedMovies: [], errors: [], queried: false, loading: false }

	onActorsSubmit = async (actorOneName, actorTwoName) => {
		this.setState({
			errors: [],
			sharedMovies: [],
			queried: false,
			loading: true,
		})
		const newErrors = []

		const actorOneId = await this.getActorId(actorOneName)

		if (!actorOneId) {
			newErrors.push(`Couldn't find an actor named ${actorOneName}`)
		}

		const actorTwoId = await this.getActorId(actorTwoName)

		if (!actorTwoId) {
			newErrors.push(`Couldn't find an actor named ${actorTwoName}`)
		}

		if (actorOneId === actorTwoId) {
			newErrors.push('Both actors cannot be the same')
		}

		if (newErrors.length > 0) {
			this.setState({ errors: newErrors })
			return
		}

		const actorOneMoviesResponse = await tmdb.get(
			`/person/${actorOneId}/movie_credits`,
			{
				params: {
					api_key: '982b666644941aee3e5b5bd88d7569d4',
				},
			}
		)

		const actorOneMovies = actorOneMoviesResponse.data.cast

		const actorTwoMoviesResponse = await tmdb.get(
			`/person/${actorTwoId}/movie_credits`,
			{
				params: {
					api_key: '982b666644941aee3e5b5bd88d7569d4',
				},
			}
		)

		const actorTwoMovies = actorTwoMoviesResponse.data.cast

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

	getActorId = async actorName => {
		const actorIdResponse = await tmdb.get('/search/person', {
			params: {
				query: actorName,
				api_key: '982b666644941aee3e5b5bd88d7569d4',
			},
		})

		if (actorIdResponse.data.results.length < 1) {
			return false
		}

		return actorIdResponse.data.results[0].id
	}

	render() {
		return (
			<div className="bg-blue-800 h-screen p-2">
				<Header />
				<SearchBars
					onActorsSubmit={this.onActorsSubmit}
					loading={this.state.loading}
				/>
				<ErrorNotices errors={this.state.errors} />
				{this.state.loading ? <Spinner /> : null}
				{this.state.queried ? (
					<>
						{this.state.sharedMovies.length > 0 ? (
							<div>Has shared movies</div>
						) : (
							<div>Has no shared movies</div>
						)}
					</>
				) : null}
			</div>
		)
	}
}

export default App
