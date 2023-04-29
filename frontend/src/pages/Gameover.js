import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gameover.css';

function GameOver() {
  const navigate = useNavigate();
  const score = localStorage.getItem('score');
  const highscore = (localStorage.getItem('highscore'));



  const handleRestart = () => {
    navigate('/game');
  };
  const handleLogout = () => {
    navigate(`/`);
  };

  return (
    <div className="game-over-container">
      <h1 className="game-over-title">Highscore: {highscore}</h1>  
      <p className="game-over-score">Last attempt: {score}</p>
      <button className="game-over-play-again" onClick={handleRestart}>
        Play again
      </button>
      <div className="menu">
        <div className="logo">Target Game</div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default GameOver;
