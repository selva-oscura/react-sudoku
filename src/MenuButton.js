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
				src="./menu-button.png" 
				alt="menu toggle"
			/>
		</a>
	</div>
)

export default MenuButton;
