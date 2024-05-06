import React, { useState, useEffect } from 'react';
import './App.css';

// Define an array of words with their corresponding clues
const wordsWithClues = [
    { word: 'hangman', clue: 'A game where you guess a word by suggesting letters' },
    { word: 'javascript', clue: 'A programming language commonly used for web development' },
    { word: 'react', clue: 'A JavaScript library for building user interfaces' },
    { word: 'developer', clue: 'Someone who writes code to create software applications' },
    { word: 'programming', clue: 'The process of designing and building an executable computer program' },
    { word: 'computer', clue: 'An electronic device that can perform various tasks by executing software programs' }
];

const Hangman = () => {
    // State variables
    const [selectedWord, setSelectedWord] = useState('');
    const [clue, setClue] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', or 'lost'

    // Function to select a word and its clue when the component mounts
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * wordsWithClues.length);
        const selectedWordData = wordsWithClues[randomIndex];
        setSelectedWord(selectedWordData.word);
        setClue(selectedWordData.clue);
    }, []);

    // Check winning condition after every guess
    useEffect(() => {
        if (computeDisplay() === selectedWord) {
            setGameStatus('won');
        }
    }, [guessedLetters, selectedWord]);

    // Function to handle user guesses
    const handleGuess = (letter) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setWrongGuessCount(wrongGuessCount + 1);
                if (wrongGuessCount + 1 === 6) {
                    setGameStatus('lost');
                }
            }
        }
    };

    // Function to compute the display word with guessed letters
    const computeDisplay = () => {
        return selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join('');
    };

    // Function to reset the game
    const resetGame = () => {
        const randomIndex = Math.floor(Math.random() * wordsWithClues.length);
        const selectedWordData = wordsWithClues[randomIndex];
        setSelectedWord(selectedWordData.word);
        setClue(selectedWordData.clue);
        setGuessedLetters([]);
        setWrongGuessCount(0);
        setGameStatus('playing');
    };

    // Render the component
    return (
        <div className="hangman-container">
            <h1>Hangman</h1>
            {/* Display game elements based on game status */}
            {gameStatus === 'playing' && (
                <div>
                    {/* Display clue */}
                    <div className="clue">
                        <p>Clue: {clue}</p>
                    </div>
                    {/* Display hangman image */}
                    <div className="hangman">
                        <pre>{renderHangman()}</pre>
                    </div>
                    {/* Display game info */}
                    <div className="game-info">
                        <p>{computeDisplay()}</p>
                        <p>Wrong guesses: {wrongGuessCount}</p>
                        <p>Guessed letters: {guessedLetters.join(', ')}</p>
                        <p>Guess a letter:</p>
                        <input
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleGuess(e.target.value.toLowerCase())}
                            value=""
                        />
                    </div>
                </div>
            )}
            {/* Display win message and button */}
            {gameStatus === 'won' && (
                <div>
                    <h2>You Win!</h2>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
            {/* Display lose message and button */}
            {gameStatus === 'lost' && (
                <div>
                    <h2>You Lose! The word was "{selectedWord}"</h2>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );

    // Render hangman based on wrong guess count
    function renderHangman() {
        const stages = [
            `
        ______
        |     |
        |
        |
        |
        |
     ___|___
    `,
            `
        ______
       |     |
       |     O
       |
       |
       |
     ___|___
    `,
            `
        ______
       |     |
       |     O
       |     |
       |
       |
     ___|___
    `,
            `
        ______
        |     |
        |     O
        |    /|
        |
        |
     ___|___
    `,
            `
        ______
        |     |
        |     O
        |    /|\\
        |
        |
     ___|___
    `,
            `
        ______
        |     |
        |     O
        |    /|\\
        |    /
        |
     ___|___
    `,
            `
        ______
        |     |
        |     O
        |    /|\\
        |    / \\
        |
     ___|___
    `,
        ];

        return stages[wrongGuessCount];
    }
};

export default Hangman;
