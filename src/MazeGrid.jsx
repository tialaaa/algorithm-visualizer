import "./MazeGrid.css";

export default function MazeGrid() {
  let maze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
  ];

  return (
    <>
      <div>
        {maze.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
