import React from 'react';

const Message = ({message}) => {
	let messageStyle="";
	if(message.length>0){
		messageStyle="message";
	}
	return (
		<div className={messageStyle}>
			<p>{message}</p>
		</div>
	)
}

export default Message;