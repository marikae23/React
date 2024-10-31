import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
    const [snake, setsSnake] = useState([[5, 5]]);
    const [food, seFood] = useState([10, 10]);
    const [direction, setDirection] = useState('Right');
    const [isGameOver, setIsGameOver] = useState(false);
    const boardSize = 20;

    const gameBoardRef = useRef(null);

    useEffect(() = {
        switch (event.key){
            case 'ArrowUp':
                if (direction !== 'DOWN') setDirection('UP');
                break;
            case 'ArrowDown':
                if (direction !== 'UP') setDirection('DOWN');
                break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') setDirection('LEFT');
                break;
            case 'ArrowRight':
                if (direction !== 'LEFT') setDirection('RIGHT');
                break;
                default:
                    break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (isGameOver) return;
        const timer = setInterval(moveSnake, 200);
        return () => clearInterval(timer);
    }, [snake, direction, isGameOver]);	

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = [...newSnake[newSnake.length - 1]];
    
    const   
)
}