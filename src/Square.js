import React from 'react';
import './Square.css';

const Square = ({rowNumber, colNumber, value}) => {

	return (
		<div className="square">
			<p>{value}</p>
		</div>
	)
}

export default Square;