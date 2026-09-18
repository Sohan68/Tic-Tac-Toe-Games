import { useState } from "react";
function Square({ value, onSqureClick }) {
  return (
    <button
      onClick={onSqureClick}
      className="bg-white border border-gray-400 m-1 h-12 w-12 leading-9 text-lg "
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winer = calculateWinner(squares);
  let status;
  if (winer) {
    status = `Winner of the game is : ${winer} `;
  } else {
    status = ` Next Player : ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSqureClick={() => handleClick(0)}>
          {" "}
        </Square>
        <Square value={squares[1]} onSqureClick={() => handleClick(1)}>
          {" "}
        </Square>
        <Square value={squares[2]} onSqureClick={() => handleClick(2)}>
          {" "}
        </Square>
      </div>

      <div className="flex">
        <Square value={squares[3]} onSqureClick={() => handleClick(3)}>
          {" "}
        </Square>
        <Square value={squares[4]} onSqureClick={() => handleClick(4)}>
          {" "}
        </Square>
        <Square value={squares[5]} onSqureClick={() => handleClick(5)}>
          {" "}
        </Square>
      </div>

      <div className="flex">
        <Square value={squares[6]} onSqureClick={() => handleClick(6)}>
          {" "}
        </Square>
        <Square value={squares[7]} onSqureClick={() => handleClick(7)}>
          {" "}
        </Square>
        <Square value={squares[8]} onSqureClick={() => handleClick(8)}>
          {" "}
        </Square>
      </div>
    </>
  );
}

export default function Game() {
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  const [currentMove, setcurrentMove] = useState(0);

  const currentSqures = history[currentMove];

  function handlePlay(nextSquares) {
    setxIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    sethistory(nextHistory);
    setcurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move) {
    setcurrentMove(move);
    setxIsNext(move % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = ` Go to the move # ${move}`;
    } else {
      description = ` Go to start the Game`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="py-4 bg-gray-300 w-72 h-screen flex flex-col gap-5 items-center justify-center mx-auto">
        {/* Board */}
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSqures}
            onPlay={handlePlay}
          ></Board>
        </div>
        {/* history */}
        <div>{moves}</div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
