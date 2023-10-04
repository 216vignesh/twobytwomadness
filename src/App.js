import React from 'react';
import './App.css';
import {useState,useRef, useEffect} from 'react';
import Model from './model/Model';
import {Board,configurations} from './model/Board';
import { drawBoard } from './boundary/boundary';

import { handleCanvasClickController, handleResetController, handleRotateController, handleSelectConfigController } from './controller/controller';
function App() {
  const[model,setModel]=useState(new Model(configurations));
  const[moveCount,setMoveCount]=useState(0);
  const[showCongrats,setShowCongrats]=useState(false);
  // const[drawingCanvasRef]=useRef(null);
  const drawingCanvasRef = useRef(null);
  const [currentConfigSize, setCurrentConfigSize] = useState(4); // Default to 4x4
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [clickedCircle, setClickedCircle] = useState(null);
  const handleCanvasClick = handleCanvasClickController(model, setModel, setClickedCircle, drawingCanvasRef,setShowCongrats,setMoveCount);
  const handleReset = handleResetController(configurations, currentConfigSize, setModel, setMoveCount, setShowCongrats);
  const handleRotate = handleRotateController(model, currentConfigSize,setModel, setMoveCount,setShowCongrats);
  const handleSelectConfig = handleSelectConfigController(model,configurations, setModel, setMoveCount, setShowCongrats, setCurrentConfigSize);


  
  useEffect(() => {
  
    drawBoard(drawingCanvasRef.current, model, clickedCircle);
        
  }, [model]);

  return (
    <div className="App">
        <div className="header">
            <h1>2x2MadnessApp</h1>
        </div>
        <div className="controls">
            <div className="controls-group">
                <button onClick={handleReset}>Reset</button>
                <button onClick={() => handleRotate('clockwise')}>Rotate Clockwise</button>
                <button onClick={() => handleRotate('counterClockwise')}>Rotate Counter-Clockwise</button>
            </div>
            <div className="controls-group">
                <button onClick={() => handleSelectConfig(4)}>4x4 Config</button>
                <button onClick={() => handleSelectConfig(5)}>5x5 Config</button>
                <button onClick={() => handleSelectConfig(6)}>6x6 Config</button>
            </div>
        </div>
        <div className="canvas-section">
            <canvas onClick={handleCanvasClick} ref={drawingCanvasRef} width={400} height={400} data-testid="myCanvas" />
            <div className="move-count">
                <label>Move Count: {moveCount}</label>
            </div>
            <label className="congrats-message" style={{ display: showCongrats ? 'block' : 'none' }}> Congratulations! You have solved the puzzle.</label>
            
        </div>
    </div>
);
}

export default App;
