import React from 'react'
import Header from './components/Header'
import SearchBars from './components/SearchBars'

class App extends React.Component {
	onActorsSubmit = (actorOne, actorTwo) => {
		console.log('actors submitted')
	}

	render() {
		return (
			<div className="bg-blue-800 h-screen p-2">
				<Header />
				<SearchBars onActorsSubmit={this.onActorsSubmit} />
			</div>
		)
	}
}

export default App
