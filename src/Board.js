import React from 'react';
import Row from './Row';
import './Board.css';

const Board = ({board, selectSquare, showErrors}) => {
	const rows = board.map((row, i) => (
		<Row 
			key={i} 
			rowNumber={i+1} 
			rowData={row} 
			selectSquare={selectSquare}
			showErrors={showErrors}
		/>
	));
	return (
		<div className="board">
			{rows}
		</div>
	)
};

export default Board;