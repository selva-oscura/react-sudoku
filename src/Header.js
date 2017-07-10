import React from 'react';
import MenuButton from './MenuButton';
import './Header.css';

const Header = ({toggleShowMenu, displayIntro}) => (
  <div className="header">
    <h2>Sudoku</h2>
    {!displayIntro ? (
			<MenuButton
				toggleShowMenu={toggleShowMenu}
			/>
    ) : null}
  </div>
);

export default Header;
