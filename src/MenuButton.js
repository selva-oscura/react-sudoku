import React from 'react';

const MenuButton = ({toggleShowMenu}) => (
	<button 
		className="menu-button"
		onClick={() => {
			toggleShowMenu()
		}
	}>
		hamburger
	</button>
)

export default MenuButton;