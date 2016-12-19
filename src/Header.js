import React from 'react';
import MenuButton from './MenuButton';
import './Header.css';

const Header = ({toggleShowMenu}) => (
  <div className="header">
  	<MenuButton 
  		toggleShowMenu={toggleShowMenu}
  	/>
    <h2>Sudoku</h2>
  </div>
);

export default Header;
