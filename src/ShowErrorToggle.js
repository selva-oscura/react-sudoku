import React from 'react';

const ShowErrorToggle = ({showErrors}) => {
	return (
		<label htmlFor="show-errors">Show Errors
			<input 
				type="checkbox" 
				name="show-errors"
			/>
		</label>
	)
}

export default ShowErrorToggle;