import React from 'react';
import './ShowErrorToggle.css';

const ShowErrorToggle = ({showErrors, toggleShowErrors}) => {
	return (
		<div className="showErrorToggle">
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
		</div>
	)
}

export default ShowErrorToggle;