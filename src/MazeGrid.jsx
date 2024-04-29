import { useEffect, useState } from 'react';
import './App.css';

export default function MazeGrid({ width = 15, height = 15 }) {
  const [maze, setMaze] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);

  // The 4 possible directions to move from a given cell
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  
  useEffect(() => {
    generateMaze(width, height)
  }, []);

  function visitCell([x, y]) {
    // Visually change each visited cell by reassigning its value
    setMaze((previousMaze) =>
      previousMaze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex === y && cellIndex === x) {
            return cell === 'end' ? 'end' : 'visited'
          };
          return cell;
        })
      )
    );

    if (maze[y][x] === 'end') {
      return true;
    };

    return false;
  };

  function bfsAlgorithm(startNode) {
    let queue = [startNode];
    // Nodes are named by [x, y] grid coordinates
    let visited = new Set(`${startNode[0]}, ${startNode[1]}`);

    function step() {
      if (queue.length === 0) {
        return;
      }

      // Select the next node in the queue
      const [x, y] = queue.shift();

      // Loop through that node's neighbors
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        // If cell is valid and unvisited, mark as visited & push to queue
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`)) {
          visited.add(`${nx}, ${ny}`);

          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell([nx, ny])) {
              return true;
            };
            queue.push([nx, ny]);
          };
        };
      };
      
      // Delay each step by 100 ms for visualization purposes, and track them in state
      const timeoutForEachStep = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutForEachStep]);
    };

    step();
    return false;
  };

  function dfsAlgorithm(startNode) {
    let stack = [startNode];
    let visited = new Set(`${startNode[0]}, ${startNode[1]}`);

    function step() {
      if (stack.length === 0) {
        return;
      }

      // Select the last node in the stack
      const [x, y] = stack.pop();

      // Loop through that node's neighbors
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        // If cell is valid and unvisited, mark as visited & push to stack
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`)) {
          visited.add(`${nx}, ${ny}`);

          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell([nx, ny])) {
              return true;
            };
            stack.push([nx, ny]);
          };
        };
      };

      // Delay each step by 100 ms for visualization purposes, and track them in state
      const timeoutForEachStep = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutForEachStep]);
    };

    step();
    return false;
  };

  function generateMaze(width, height) {
    let matrix = [];

    for (let i = 0; i < height; i++) {
      let row = [];

      for (let j = 0; j < width; j++) {
        row.push('wall')
      };

      matrix.push(row);
    };

    function isCellValid(x, y) {
      return y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === 'wall';
    };

    // Recursively carve from a given point by randomly selecting a starting direction & verifying each neighbor cell as a valid path space
    function carvePath(x, y) {
      matrix[y][x] = 'path';

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = 'path';
          carvePath(nx, ny);
        }
      };
    };

    carvePath(1, 1);

    matrix[1][0] = 'start';
    matrix[height - 2][width - 1] = 'end';
    setMaze(matrix);
  };

  function refreshMaze() {
    // Reset all timeoutIds & state to ensure visualization stops when maze is refreshed
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    generateMaze(width, height);
  };

  return (
    <div className='maze-container'>
      <div className='button-container'>
        <button className='button' onClick={() => refreshMaze()}>
          Refresh Maze
        </button>
        <button className='button' onClick={() => bfsAlgorithm([1, 0])}>
          Breadth-First Search
        </button>
        <button className='button' onClick={() => dfsAlgorithm([1, 0])}>
          Depth-First Search
        </button>
      </div>
      <div className='maze'>
        {maze.map((row, rowIndex) => (
          <div className='maze-row' key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`} key={cellIndex}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
