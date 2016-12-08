import React from 'react';
import './ShowErrorToggle.css';

const ShowErrorToggle = ({showErrors, toggleShowErrors}) => {
	return (
		<span
			className="showErrorToggle"
		>
			<label 
				htmlFor="show-errors"
				>
				<input 
					type="checkbox" 
					name="show-errors"
					checked={showErrors}
					onClick={() => {
						toggleShowErrors()
					}
				}/>
				Show Errors
			</label>
		</span>
	)
}

export default ShowErrorToggle;
		// <div className="showErrorToggle">
		// <p>stand in</p>
		// </div>