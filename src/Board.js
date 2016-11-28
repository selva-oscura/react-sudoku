import React from 'react';
import Row from './Row';
import './Board.css';

const Board = ({board, selectSquare}) => {
	const rows = board.map((row, i) => (
		<Row 
			key={i} 
			rowNumber={i+1} 
			rowData={row} 
			selectSquare={selectSquare}
		/>
	));
	return (
		<div className="board">
			{rows}
		</div>
	)
};

export default Board;