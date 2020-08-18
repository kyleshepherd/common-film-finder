import React from 'react'

const Spinner = () => {
	return (
		<div className="h-screen w-screen absolute inset-0 bg-gray-900 bg-opacity-50">
			<div className="loader-wrapper absolute">
				<div className="loader ease-linear rounded-full border-8 border-t-8 h-32 w-32"></div>
			</div>
		</div>
	)
}

export default Spinner
