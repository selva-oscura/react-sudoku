import React from 'react';
import './Menu.css';

const Menu = ({toggleShowMenu, newGame, restartGame, showIntro}) => (
	<div className="menu">
		<div className="modal"
      onClick={() => {
        toggleShowMenu();
      }
    }>
			<div className="menu-body">
				<button 
					onClick={() => {
						newGame()
					}
				}>
					New Game
				</button>
				<button>
					Resume Game
				</button>
				<button 
					onClick={() => {
						restartGame()
					}
				}>
					Restart Game
				</button>
				<button 
					onClick={() => {
						showIntro()
					}
				}>
					Show Instructions
				</button>
			</div>
		</div>
	</div>
);


export default Menu;