import React from 'react';
import './Square.css';
import PencilMarks from './PencilMarks';

const Square = ({rowNumber, colNumber, square, selectSquare}) => {
	let squareStyle="square";
	if(rowNumber===1){
		squareStyle += " board-top";
	}else if(rowNumber===9){
		squareStyle += " board-bottom"
	}else if(rowNumber===3 || rowNumber===6){
		squareStyle += " row-divider-bottom";
	}else if(rowNumber===4 || rowNumber===7){
		squareStyle += " row-divider-top";
	}
	if(colNumber===1){
		squareStyle += " board-left";
	}else if(colNumber===9){
		squareStyle += " board-right"
	}else if(colNumber===3 || colNumber===6){
		squareStyle += " row-divider-right";
	}else if(colNumber===4 || colNumber===7){
		squareStyle += " row-divider-left";
	}
	if(square.selected){
		squareStyle += " selected";
	}
	let squareContent;
	if(square.display){
		squareContent = (
			<p>{square.value}</p>
		)
	}else if(square.inkMark){
		let inkStyle = "inkmark";
		if(square.value!==square.inkMark){
			inkStyle += " error";
		}
		squareContent = (
			<p className={inkStyle}>{square.inkMark}</p>
		)		
	}else if(square.pencilMarks.indexOf(true)>-1){
		squareContent = (
			<PencilMarks 
				pencilMarks={square.pencilMarks}
			/>
		)
	}else{
		squareContent = (
			<p>&nbsp;</p>
		);
	}
	return (
		<div 
			className={squareStyle}
			onClick={() => {
				selectSquare(rowNumber-1, colNumber-1)
			}
		}>
			{squareContent}
		</div>
	)
}

export default Square;