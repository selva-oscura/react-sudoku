import React from 'react';

const ShowErrorToggle = ({showErrors, toggleShowErrors}) => {
	return (
		<label htmlFor="show-errors">Show Errors
			<input 
				type="checkbox" 
				name="show-errors"
				checked={showErrors}
				onClick={() => {
					toggleShowErrors()
				}
			}/>
		</label>
	)
}

export default ShowErrorToggle;