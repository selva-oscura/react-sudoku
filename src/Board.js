import React from 'react';
import './Board.css';

const Board = ({board}) => {
	console.log('board', board);
	board.forEach((row) => console.log('row', row.join(', ')))
	return (
		<div className="board">

		</div>
	)
};

export default Board;