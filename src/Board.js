import React from 'react';
import Row from './Row';
import './Board.css';

const Board = ({board}) => {
	console.log('board', board);
	board.forEach((row) => console.log('row', row.join(', ')))
	const rows = board.map((row, i) => <Row key={i} i={i} row={row} />);
	return (
		<div className="board">
			{rows}
		</div>
	)
};

export default Board;