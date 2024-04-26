import { useState } from 'react';
import './MazeGrid.css';

export default function MazeGrid() {
  let initialMaze = [
    ['wall', 'wall', 'wall', 'wall'],
    ['start', 'path', 'path', 'wall'],
    ['wall', 'wall', 'path', 'wall'],
    ['wall', 'wall', 'path', 'end'],
    ['wall', 'wall', 'wall', 'wall'],
  ];

  function bfs(startNode) {
    let queue = [startNode];
    // Nodes are named by [x, y] grid coordinates
    let visited = new Set(`${start[0]}, ${start[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);

      if (maze[y][x] === 'end') {
        console.log('path found!');
        return true;
      };

      return false;
    };

    function step() {
      if (queue.length === 0) {
        return;
      }

      // Select the next node in the queue
      const [x, y] = queue.shift();
      console.log('new step');

      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
      ];

      // Loop through that node's neighbors
      for (const [dx, dy] of dirs) {
        nx = x + dx;
        ny = y + dy;

        // If cell is valid and unvisited, mark as visited & push to queue
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`)) {
          visited.add(`${nx}, ${ny}`);

          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell(start)) {
              return true;
            };
            queue.push([nx][ny]);
          };
        };
      };
    };

    step();
    return false;
  };

  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set(`${start[0]}, ${start[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);

      if (maze[y][x] === 'end') {
        console.log('path found!');
        return true;
      };

      return false;
    };

    function step() {
      if (stack.length === 0) {
        return;
      }

      // Select the last node in the stack
      const [x, y] = stack.pop();
      console.log('new step');

      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
      ];

      // Loop through that node's neighbors
      for (const [dx, dy] of dirs) {
        nx = x + dx;
        ny = y + dy;

        // If cell is valid and unvisited, mark as visited & push to stack
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`)) {
          visited.add(`${nx}, ${ny}`);

          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell(start)) {
              return true;
            };
            stack.push([nx][ny]);
          };
        };
      };
    };

    step();
    return false;
  };

  const [maze, setMaze] = useState(initialMaze);

  function generateMaze(height, width) {
    let matrix = [];

    for (let i = 0; i < height; i++) {
      let row = [];

      for (let j = 0; j < width; j++) {
        let cell = Math.random();
        row.push('wall')
      };

      matrix.push(row);
    };

    console.log(matrix)

    // The 4 possible directions to move from a given cell
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
    ];

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

  return (
    <div className='maze-container'>
      <button className='refresh-button' onClick={() => generateMaze(10, 10)}>
        Refresh Maze
      </button>
      <div className='maze'>
        {maze.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`} key={cellIndex}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
