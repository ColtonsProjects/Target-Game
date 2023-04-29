import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game.css';



function Game() {
    const history = useNavigate();
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);
    const [isActive, setIsActive] = useState(false);
    const [targets, setTargets] = useState([]);
    const [clickCount, setClickCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const startTimeRef = useRef(null); 
    const elapsedTimeRef = useRef(0); 
    const username = (localStorage.getItem('username'));
    const highscore = (localStorage.getItem('highscore'));
    //const token = JSON.parse(localStorage.getItem('token'));

    

    
    const handleLogout = () => {
      history(`/`)
    }


  
    // Generates a target with a random size based on the click count
    function generateTarget() {
      const size = 50 - Math.floor(clickCount / 10) * 5;
      const maxY = window.innerHeight * 0.90; // 90% of the screen height
      const minY = window.innerHeight * 0.10; // 10% of the screen height
      const target = {
        x: Math.floor(Math.random() * (window.innerWidth - size)),
        y: Math.floor(Math.random() * (maxY - minY)) + minY,
        size: size
      };
      return target;
    }  
  
    // Starts the game by setting the active state to true and resetting the score, timer, targets, and click count
    function startGame() {
      setIsActive(true);
      setIsGameOver(false);
      setScore(0);
      setTimer(15);
      setTargets([generateTarget()]);
      setClickCount(0);
      startTimeRef.current = Date.now(); // store the start time
      elapsedTimeRef.current = 0; // reset the elapsed time
    }
  


    // Handles a click event on a target
    function handleClick(target) {
      if (isActive) {
        setScore(score + 1);
        setClickCount(clickCount + 1);
        const newTargets = targets.filter(t => t !== target);
        setTargets(newTargets);
        setTargets(targets => [...targets, generateTarget()]);
      }
    }

    const new_highScore = useCallback(async () => {
      if(score > highscore){
        const response = await fetch('http://localhost:4000/api/patch', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              highScore: score
            })
          });
  
        const data = await response.json()
        localStorage.setItem('highscore', score);
        window.location.reload();
        console.log(data)
      }
    }, [username, score, highscore]);


  
    // Updates the timer every second and generates new targets every 2 seconds
    useEffect(() => {

      let interval;
      if (isActive) {
        interval = setInterval(() => {
          // calculate elapsed time using the current time and the start time
          elapsedTimeRef.current = Date.now() - startTimeRef.current;
          setTimer(Math.max(15 - Math.floor(elapsedTimeRef.current / 1000), 0));
        }, 50);
  
        if (timer === 0 || isGameOver) {
          new_highScore();
          setIsActive(false);
          setIsGameOver(true);
          localStorage.setItem('score', score);
          history(`/gameover`, { score });
          
        }
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [isActive, timer, isGameOver, history, score, username, new_highScore]);

  


  return (
    <div className="game-container">
      {isActive ? (
        <div>
          <div className="score-container">
            <div className="score-label">Score:</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="timer-container">
            <div className="timer-label">Time:</div>
            <div className="timer-value">{timer}</div>
          </div>
          {targets.map((target, index) => (
            <div
              key={index}
              className="target"
              style={{ left: target.x, top: target.y }}
              onClick={() => handleClick(target)}
            />
          ))}
        </div>
      ) : (
        <div className="center-container">
          <div className="title">Welcome to Target Practice {username}</div>
          <button className="start-button" onClick={startGame} >Start Game</button>
        </div>
      )}
      {isActive || score === 0 ? (
        <div className="menu">
          <div className="logo">Target Game</div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <div className="title" >Game Over</div>
          <div className="score-container">
            <div className="score-label">Score:</div>
            <div className="score-value">{score}</div>
          </div>
          <button className="start-button" onClick={startGame} style={{ marginLeft: '200px'}}>Play Again</button>
        </div>
      )}
      <div className="menu">
        <div className="logo">Target Game</div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Game;