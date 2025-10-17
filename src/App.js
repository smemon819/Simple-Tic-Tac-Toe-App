import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (newBoard.every(cell => cell !== null)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tic-Tac-Toe
        </h1>
        
        <div className="flex justify-around mb-6 text-sm">
          <div className="text-center">
            <div className="font-bold text-blue-600">Player X</div>
            <div className="text-2xl font-bold">{scores.X}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-600">Draws</div>
            <div className="text-2xl font-bold">{scores.draws}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-600">Player O</div>
            <div className="text-2xl font-bold">{scores.O}</div>
          </div>
        </div>

        <div className="mb-6">
          {winner ? (
            <div className="text-center text-2xl font-bold text-green-600 animate-pulse">
              🎉 Player {winner} Wins! 🎉
            </div>
          ) : isDraw ? (
            <div className="text-center text-2xl font-bold text-gray-600">
              It's a Draw!
            </div>
          ) : (
            <div className="text-center text-xl font-semibold text-gray-700">
              Current Turn: <span className={isXNext ? 'text-blue-600' : 'text-purple-600'}>
                Player {isXNext ? 'X' : 'O'}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square text-5xl font-bold rounded-xl transition-all duration-200 ${
                cell === 'X' ? 'bg-blue-100 text-blue-600' :
                cell === 'O' ? 'bg-purple-100 text-purple-600' :
                'bg-gray-100 hover:bg-gray-200 active:scale-95'
              } ${!cell && !winner ? 'cursor-pointer' : 'cursor-default'} shadow-md`}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 active:scale-95 shadow-lg"
          >
            New Game
          </button>
          <button
            onClick={resetScores}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 active:scale-95 shadow-lg"
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
