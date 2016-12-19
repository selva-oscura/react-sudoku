import React from 'react';
import MenuButton from './MenuButton';
import './Header.css';

const Header = ({toggleShowMenu}) => (
  <div className="header">
    <h2>Sudoku</h2>
  	<MenuButton 
  		toggleShowMenu={toggleShowMenu}
  	/>
  </div>
);

export default Header;
