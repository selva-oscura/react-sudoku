import React from 'react';

const PausedGame = ({pausedGameToggle}) => (
	<div className="paused-game"
      onClick={() => {
        pausedGameToggle();
      }
    }>
    <div className="paused-game-body">
      <button
        className="paused-game-button"
        onClick={() => {
          pausedGameToggle();
        }
      }>
        Return to Game
      </button>
    </div>
	</div>
);

export default PausedGame;