import React from 'react';
import Row from './Row';
import './Board.css';

const Board = ({board}) => {
	const rows = board.map((row, i) => (
		<Row 
			key={i} 
			rowNumber={i+1} 
			rowData={row} 
		/>
	));
	return (
		<div className="board">
			{rows}
		</div>
	)
};

export default Board;