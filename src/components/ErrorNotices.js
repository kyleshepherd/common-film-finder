import React from 'react'

const ErrorNotices = ({ errors }) => {
	return (
		<React.Fragment>
			{errors.length > 0 ? (
				<div className="text-center">
					{errors.map(error => {
						return (
							<p className="text-red-600" key={error}>
								{error}
							</p>
						)
					})}
				</div>
			) : null}
		</React.Fragment>
	)
}

export default ErrorNotices
