import React from 'react'

class SearchBars extends React.Component {
	state = { actorOne: '', actorTwo: '' }

	onFormSubmit = e => {
		e.preventDefault()

		if (this.state.actorOne === '' || this.state.actorTwo === '') {
			console.log('need to enter both actors')
			return
		}

		this.props.onActorsSubmit(this.state.actorOne, this.state.actorTwo)
	}

	render() {
		return (
			<div className="text-center">
				<form onSubmit={this.onFormSubmit}>
					<div className="mb-2">
						<label
							htmlFor="actor-one"
							className="block text-white text-lg tracking-wide"
						>
							Actor One
						</label>
						<input
							id="actor-one"
							className="max-w-xs w-full p-1"
							type="text"
							value={this.state.actorOne}
							onChange={e => this.setState({ actorOne: e.target.value })}
						/>
					</div>
					<div className="mb-2">
						<label
							htmlFor="actor-two"
							className="block text-white text-lg tracking-wide"
						>
							Actor Two
						</label>
						<input
							id="actor-two"
							className="max-w-xs w-full p-1"
							type="text"
							value={this.state.actorTwo}
							onChange={e => this.setState({ actorTwo: e.target.value })}
						/>
					</div>
					<button
						type="submit"
						className={`rounded px-4 py-1 mt-2 hover:bg-gray-400 ${
							this.props.loading
								? 'disabled cursor-not-allowed bg-gray-700'
								: 'bg-gray-200'
						}`}
						disabled={this.props.loading}
					>
						Search
					</button>
				</form>
			</div>
		)
	}
}

export default SearchBars
