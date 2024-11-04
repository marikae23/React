import React, { useState, useEffect, useRef } from 'react';
import '../styles/SnakeGame.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const boardSize = 20;

  const gameBoardRef = useRef(null);
  const directionRef = useRef(direction); 

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 's':
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'a':
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'd':
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver || !isGameStarted) return;
    const timer = setInterval(moveSnake, 200);
    return () => clearInterval(timer);
  }, [snake, isGameOver, isGameStarted]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    switch (directionRef.current) {
      case 'UP':
        head[1] -= 1;
        break;
      case 'DOWN':
        head[1] += 1;
        break;
      case 'LEFT':
        head[0] -= 1;
        break;
      case 'RIGHT':
        head[0] += 1;
        break;
      default:
        break;
    }

    if (checkCollision(head)) {
      setIsGameOver(true);
      if (window.confirm('Game over! Do you want to restart?')) {
        startGame();
      }
      return;
    }

    newSnake.push(head);
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateFoodPosition());
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  const checkCollision = (head) => {
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= boardSize ||
      head[1] >= boardSize ||
      snake.some((segment) => segment[0] === head[0] && segment[1] === head[1])
    ) {
      return true;
    }
    return false;
  };

  const generateFoodPosition = () => {
    let newFoodPosition;
    do {
      newFoodPosition = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
    } while (snake.some((segment) => segment[0] === newFoodPosition[0] && segment[1] === newFoodPosition[1]));
    return newFoodPosition;
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setSnake([[5, 5]]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
  };

  return (
    <div className="snake-game" ref={gameBoardRef}>
      {!isGameStarted ? (
        <div className="start-screen">
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          {snake.map((segment, index) => (
            <div
              key={index}
              className="snake-segment"
              style={{
                left: `${segment[0] * 20}px`,
                top: `${segment[1] * 20}px`,
              }}
            />
          ))}
          <div
            className="snake-food"
            style={{
              left: `${food[0] * 20}px`,
              top: `${food[1] * 20}px`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default SnakeGame;