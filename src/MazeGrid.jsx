import { useState } from "react";
import "./MazeGrid.css";

export default function MazeGrid() {
  let initialMaze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
    ["wall", "wall", "wall", "wall"],
  ];

  const [maze, setMaze] = useState(initialMaze);

  function generateMaze(height, width) {
    let matrix = [];

    for (let i = 0; i < height; i++) {
      let row = [];

      for (let j = 0; j < width; j++) {
        let cell = Math.random();
        if (cell < 0.5) {
          row.push("wall");
        } else {
          row.push("path");
        }
      }

      matrix.push(row);
    };

    console.log(matrix)
    matrix[1][0] = 'start';
    matrix[height - 2][width - 1] = 'end';

    setMaze(matrix);
  };

  return (
    <div className="maze-container">
      <button className="refresh-button" onClick={() => generateMaze(5, 6)}>
        Refresh Maze
      </button>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
