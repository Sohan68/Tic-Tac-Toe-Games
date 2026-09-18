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

function Board() {
  const [squrares, setsqurares] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  const winer = calculateWinner(squrares);
  let status;
  if (winer) {
    status = ` The winner of the game is : ${winer}`;
  } else {
    status = ` Next Player : ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i) {
    if (squrares[i] || calculateWinner(squrares)) {
      return;
    }
    const nextSquares = squrares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setsqurares(nextSquares);
    setxIsNext(!xIsNext);
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squrares[0]} onSqureClick={() => handleClick(0)}>
          {" "}
        </Square>
        <Square value={squrares[1]} onSqureClick={() => handleClick(1)}>
          {" "}
        </Square>
        <Square value={squrares[2]} onSqureClick={() => handleClick(2)}>
          {" "}
        </Square>
      </div>

      <div className="flex">
        <Square value={squrares[3]} onSqureClick={() => handleClick(3)}>
          {" "}
        </Square>
        <Square value={squrares[4]} onSqureClick={() => handleClick(4)}>
          {" "}
        </Square>
        <Square value={squrares[5]} onSqureClick={() => handleClick(5)}>
          {" "}
        </Square>
      </div>

      <div className="flex">
        <Square value={squrares[6]} onSqureClick={() => handleClick(6)}>
          {" "}
        </Square>
        <Square value={squrares[7]} onSqureClick={() => handleClick(7)}>
          {" "}
        </Square>
        <Square value={squrares[8]} onSqureClick={() => handleClick(8)}>
          {" "}
        </Square>
      </div>
    </>
  );
}

export default Board;

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
