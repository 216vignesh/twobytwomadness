import React from 'react';
import {useState,useRef, useEffect} from 'react';
import Model from './model/Model';
import {Board,configurations} from './model/Board';
//console.log(configurations)
// import logo from './logo.svg';
// import './App.css';

function App() {
  const[model,setModel]=useState(new Model(configurations));
  const[moveCount,setMoveCount]=useState(0);
  const[showCongrats,setShowCongrats]=useState(false);
  // const[drawingCanvasRef]=useRef(null);
  const drawingCanvasRef = useRef(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  useEffect(() => {
  
    const canvas = drawingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellSize = 400 / model.board.size;
    const squareSize = canvas.width / model.board.size;
    for (let i = 0; i < model.board.size; i++) {
      for (let j = 0; j < model.board.size; j++) {
          ctx.fillStyle = model.board.squares[i][j].color;
          ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize); // Flipped i and j here
      }
  }
  
    for(let i = 1; i < model.board.size; i++) {
        for(let j = 1; j < model.board.size; j++) {
            const x = j * cellSize;
            const y = i * cellSize;

            ctx.beginPath();
            ctx.arc(x, y, cellSize / 4, 0, 2 * Math.PI); // Drawing a circle
            ctx.fillStyle = "#FFF"; // White Circle
            ctx.fill();
            ctx.strokeStyle = "#000"; // Black border
            ctx.stroke();
        }
    }
    if (model.board.selectedGroup) {
      const [startRow, startCol] = model.board.selectedGroup;
      const startX = startCol * cellSize;
      const startY = startRow * cellSize;
  
      ctx.strokeStyle = "#FF0000"; // Red border for highlight
      ctx.lineWidth = 4;
      ctx.strokeRect(startX, startY, 2 * cellSize, 2 * cellSize);
  }
        
  }, [model]);
  

function isInsideCircle(px, py, cx, cy, r) {
  const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
  return dist < r;
}


const handleCanvasClick = (event) => {
  const rect = drawingCanvasRef.current.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cellSize = 400 / model.board.size;

  for(let i = 1; i < model.board.size; i++) {
      for(let j = 1; j < model.board.size; j++) {
          const centerX = j * cellSize;
          const centerY = i * cellSize;

          if (isInsideCircle(x, y, centerX, centerY, cellSize / 4)) {
              model.board.selectGroup(i-1, j-1);
              setModel({ ...model }); // This will re-render the component.
              return;
          }
      }
  }
};



  const handleReset = () => {
    //console.log("model",model);
    model.board.reset();
    setMoveCount(model.board.moveCount);
  };
  const handleRotate = (direction) => {
    // Assuming the model has a rotate method
    if(model.board.selectedGroup==null)
    {
      console.log("Please select a group first");
      
    }
    // console.log(model.board.selectedGroup);
    model.board.rotate(direction);
    setMoveCount(model.board.moveCount);
    setModel({ ...model });
    if (model.board.isSolved()) {
      setShowCongrats(true);
    }
  };
  const handleSelectConfig = (size) => {
    // Logic to select and initialize a configuration based on the provided size
    // Assuming the Model class has a method or constructor that takes a size parameter
    
    const config = configurations.find(conf => conf.size === size);
    const newModel = new Model(config);
    setModel(newModel);
    setMoveCount(0);
    setShowCongrats(false);
  };
  return (
    <div className="App">
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => handleRotate('clockwise')}>Rotate Clockwise</button>
      <button onClick={() => handleRotate('counterClockwise')}>Rotate Counter-Clockwise</button>
      <button onClick={() => handleSelectConfig(4)}>4x4 Config</button>
      <button onClick={() => handleSelectConfig(5)}>5x5 Config</button>
      <button onClick={() => handleSelectConfig(6)}>6x6 Config</button>
      <label>Move Count: {moveCount}</label>
      {showCongrats && <label>Congratulations! You've solved the puzzle.</label>}
      <canvas onClick={handleCanvasClick} ref={drawingCanvasRef} width={400} height={400} />
    </div>
  );
}

export default App;
