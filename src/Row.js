import React from 'react';
import Square from './Square';
import './Row.css';

const Row = ({rowNumber, rowData, selectSquare, showErrors}) => {
	const squares = rowData.map((square, i)=>(
		<Square 
			key={i} 
			rowNumber={rowNumber} 
			colNumber={i+1} 
			square={square}
			selectSquare={selectSquare}
			showErrors={showErrors}
		 />
	));
	return(
		<div className="row">
			{squares}			
		</div>
	)
}

export default Row;
