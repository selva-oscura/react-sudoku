import React from 'react';
import './Square.css';

const Square = ({rowNumber, colNumber, value}) => {
	let squareStyle="square";
	if(rowNumber===1){
		squareStyle+=" board-top";
	}else if(rowNumber===9){
		squareStyle+=" board-bottom"
	}else if(rowNumber===3 || rowNumber===6){
		squareStyle+=" row-divider-bottom";
	}else if(rowNumber===4 || rowNumber===7){
		squareStyle+=" row-divider-top";
	}
	if(colNumber===1){
		squareStyle+=" board-left";
	}else if(colNumber===9){
		squareStyle+=" board-right"
	}else if(colNumber===3 || colNumber===6){
		squareStyle+=" row-divider-right";
	}else if(colNumber===4 || colNumber===7){
		squareStyle+=" row-divider-left";
	}
	return (
		<div className={squareStyle}>
			<p>{value}</p>
		</div>
	)
}

export default Square;