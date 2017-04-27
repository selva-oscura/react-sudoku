import React from 'react';
import './MenuButton.css';

const MenuButton = ({toggleShowMenu}) => (
	<div className="menu-button"
		onClick={() => {
			toggleShowMenu()
		}
	}>
		<a>
			<img 
				src="./img/menu-button.gif"
				alt="menu toggle"
			/>
		</a>
	</div>
)

export default MenuButton;
