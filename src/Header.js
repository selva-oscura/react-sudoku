import React from 'react';
import MenuButton from './MenuButton';
import './Header.css';

const Header = ({displayMenu, toggleShowMenu}) => (
  <div className="header">
  	<MenuButton 
  		displayMenu={displayMenu}
  		toggleShowMenu={toggleShowMenu}
  	/>
    <h2>Sudoku</h2>
  </div>
);

export default Header;
