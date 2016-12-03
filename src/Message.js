import React from 'react';
import NewGame from './NewGame';
import './Message.css';

const Message = ({message, gameStatus, newGame}) => {
	let messageStyle="";
	if(message.length>0){
		messageStyle="message";
	}
	if(gameStatus==="gameOver"){

	}
	return (
		<div className={messageStyle}>
			<p>{message}</p>
			{ gameStatus==="gameOver" ? <NewGame newGame={newGame} /> : null }
		</div>
	)
}

export default Message;