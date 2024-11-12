// Pretendo adicionar dificuldade, fácil, médio e díficil.
// Pretendo adicionar uma opção que o usuário possa escolher a cor da cobra.
// Pretendo adicionar "comidas" de cores diferentes que podem ser buffs ou debuffs. (Ex: Comer a comida azul faz com que você perca 15% dos pontos)
// Pretendo melhorar o CSS do jogo, deixando algo mais bonito e ainda retrô.

// Buff e Debuffs
// Comida amarela: normal
// Comida roxo: ganhe o dobro de pontos por 20s
// Comida verde: perca 10% do tamanho sem perder pontuação

// Comida vermelha: ganha 20% mais velocidade e 20% mais tamanho
// Comida azul: comer o azul te faz perder 15% da pontuação
// Comida branca: inverte o teclado.


import React, { useState, useEffect, useRef } from 'react';
import '../styles/SnakeGame.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [foodCount, setFoodCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
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
      if (foodCount > highScore) {
        setHighScore(foodCount);
      }
      return;
    }

    newSnake.push(head);
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateFoodPosition());
      setFoodCount(foodCount + 1);
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
    setFoodCount(0);
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <div className="snake-game" ref={gameBoardRef}>
      <div className="score-board">
        <div className="counter">Food Eaten: {foodCount}</div>
      </div>
      {!isGameStarted ? (
        <div className="start-screen">
          <button onClick={startGame}>START</button>
        </div>
      ) : (
        <>
          {isGameOver && (
            <div className="game-over-screen">
              <p>Game Over!</p>
              <p>High Score: {highScore}</p>
              <button onClick={restartGame}>RESTART</button>
            </div>
          )}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === snake.length - 1 ? 'head' : ''}`}
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
