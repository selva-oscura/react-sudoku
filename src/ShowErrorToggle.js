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
					defaultChecked={showErrors}
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