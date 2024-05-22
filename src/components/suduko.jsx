import React, { useState, useEffect } from "react";

//backtracking logic to genrate random suduko
const generateSolvedGrid = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Generate a valid solved Sudoku grid
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  const numbers = shuffleArray([...Array(9).keys()].map((i) => i + 1));

  const fillGrid = (grid) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          for (let number of numbers) {
            if (isValid(grid, i, j, number)) {
              grid[i][j] = number;
              if (fillGrid(grid)) return true;
              grid[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
      if (
        grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      )
        return false;
    }
    return true;
  };

  //calling fill grid function
  fillGrid(grid);
  return grid;
};

//Here we are removing element from grid
const removeElements = (grid, difficulty = 40) => {
  const newGrid = grid.map((row) => row.slice());
  let attempts = difficulty;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (newGrid[row][col] !== 0) {
      newGrid[row][col] = 0;
      attempts--;
    }
  }
  return newGrid;
};

//Here we check puzzle filled correctly or not
const checksudukopuzzle = (grid, solved) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== solved[row][col]) {
        return false;
      }
    }
  }

  return true;
};

const Sudoku = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [type, setType] = useState();
  const [solved, setSolved] = useState([]);
  const [check, setCheck] = useState(false);
  const [isshow, setIsshow] = useState(false);

  const handleChange = (rindex, cindex, value) => {
    const newGrid = grid.map((row, rowIndex) =>
      rowIndex === rindex
        ? row.map((cell, colIndex) => (colIndex === cindex ? value : cell))
        : row
    );
    setGrid(newGrid);
  };

  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore ? parseInt(storedScore, 10) : 0;
  });
  const handleChange1 = (e) => {
    const solvedGrid = generateSolvedGrid();
    setSolved(solvedGrid);
    setType(e);
    setIsshow(false);
    setGrid([]);
    if (e === undefined || e === "Easy") {
      const puzzleGrid = removeElements(solvedGrid, 1);
      setGrid(puzzleGrid);
    } else if (e === "Medium") {
      const puzzleGrid = removeElements(solvedGrid, 40);
      setGrid(puzzleGrid);
    } else {
      const puzzleGrid = removeElements(solvedGrid, 55);
      setGrid(puzzleGrid);
    }
  };

  const submitChange = (e) => {
    if (isshow === true) {
      setCheck(false);
      return;
    }
    if (type === undefined) {
      return;
    }
    setCheck(checksudukopuzzle(grid, solved));
  };

  useEffect(() => {
    if (check === true) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        localStorage.setItem("score", newScore);
        return newScore;
      });
      setGrid(Array.from({ length: 9 }, () => Array(9).fill(0)));
      setTimeout(() => setCheck(false), 3000);
    }
  }, [check]);

  const showSol = () => {
    setGrid(solved);
    setIsshow(true);
  };

  return (
    <div className="m-8">
      <div className="mt-4 fixed inset-0 flex justify-center h-14">
        {check === true && (
          <p className="bg-green-400 p-4 rounded text-white text-center">
            Congrats! You solved the puzzle.
          </p>
        )}
      </div>

      <div className="mt-4 fixed inset-0 flex justify-center h-14">
        {isshow === true && (
          <p className="bg-red-400 p-4 rounded text-white text-center font-bold">
            You already saw the solution!
          </p>
        )}
      </div>

      <p className="flex justify-center text-2xl mb-10 font-serif font-semibold  bg-slate-100 p-2 rounded-2xl">
        Welcome to Suduko
      </p>
      <div className="justify-between m-auto flex-col flex md:flex-row">
        <button
          onClick={() => handleChange1("Easy")}
          className="pl-6 pr-6 pt-2 pb-2 bg-green-500 hover:bg-green-600 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold"
        >
          Easy
        </button>
        <button
          onClick={() => handleChange1("Medium")}
          className="pl-6 pr-6 pt-2 pb-2 bg-blue-500 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 hover:bg-blue-600 font-semibold"
        >
          Medium
        </button>
        <button
          onClick={() => handleChange1("Hard")}
          className="pl-6 pr-6 pt-2 pb-2 bg-red-500 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 hover:bg-red-600 font-semibold"
        >
          Hard
        </button>
      </div>
      <div className="font-bold text-2xl flex ">Score:{score}</div>
      <div className="flex justify-center items-center mt-6">
        <table className="w-full max-w-screen-md">
          <tbody>
            {grid.map((row, rindex) => (
              <tr key={rindex} className="grid grid-cols-9">
                {row.map((cell, cindex) => (
                  <td key={cindex} className="p-1">
                    <input
                      type="number"
                      min="1"
                      max="9"
                      value={cell === 0 ? "" : cell}
                      onChange={(e) =>
                        handleChange(
                          rindex,
                          cindex,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className={`pt-2 pb-2 w-full md:h-12 h-10 text-center ${
                        cell !== 0 ? "bg-gray-400" : "bg-red-300"
                      } font-serif`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            submitChange();
          }}
          className="pl-6 pr-6 pt-2 pb-2 bg-blue-700 hover:bg-blue-800 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold mt-6"
        >
          Submit
        </button>
        <button
          onClick={() => {
            showSol();
          }}
          className="pl-6 pr-6 pt-2 pb-2 bg-red-500 hover:bg-red-600 rounded-xl text-slate-100 md:text-2xl text-xl font-serif mb-2 font-semibold mt-6"
        >
          Show Solution
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
