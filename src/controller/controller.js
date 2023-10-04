// controller.js
import Model from '../model/Model.js';
import React from 'react';
import {useState,useRef, useEffect} from 'react';
import {Board,configurations} from '../model/Board';
export function isInsideCircle(px, py, cx, cy, r) {
      const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
      return dist < r;
    }
export const handleCanvasClickController = (model, setModel, setClickedCircle, drawingCanvasRef,setShowCongrats,setMoveCount) => (event) => {
  const rect = drawingCanvasRef.current.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cellSize = 400 / model.board.size;
  // console.log("x",x);
  // console.log("y",y);

  for(let i = 1; i < model.board.size; i++) {
      for(let j = 1; j < model.board.size; j++) {
          const centerX = j * cellSize;
          const centerY = i * cellSize;

          if (isInsideCircle(x, y, centerX, centerY, cellSize / 4)) {
            // console.log('Inside the circle');
            if (model.board.selectedGroup && model.board.selectedGroup[0] === i - 1 && model.board.selectedGroup[1] === j - 1) {
              // Deselect the group
              model.board.selectedGroup = null;
              setClickedCircle(null);
          }
          else{
              //model.board.selectGroup(i-1, j-1);
              // console.log("False____");
              const wasGroupSelected = model.board.selectGroup(i - 1, j - 1);
              setClickedCircle({i, j});
            if (!wasGroupSelected) {
              // console.log("Group cannot be selected as all squares are white.");
              return;
            }
            if (model.board.isSolved()) {
              // console.log("Board is solved. About to call setShowCongrats...");
              setShowCongrats(true);
              
              
          }
          }
              setMoveCount(model.board.moveCount);
              setModel({ ...model }); 
              return;
          
        }
      }
  }
  
};

export const handleResetController = (configurations, currentConfigSize, setModel, setMoveCount, setShowCongrats) => () => {
    const config = configurations.find(conf => conf.size === currentConfigSize);
        const newModel = new Model(config);
        
        setShowCongrats(false);
        setModel(newModel);
        // setMoveCount(model.board.moveCount);
        setMoveCount(0);
      };
      

export const handleRotateController = (model, currentConfigSize,setModel, setMoveCount,setShowCongrats) => (direction) => {
    // if(model.board.selectedGroup==null)
    // {
    //   console.log("Please select a group first");
      
      
    // }
    
    // console.log(model.board.selectedGroup);
    model.board.rotate(direction);
    
    setMoveCount(model.board.moveCount);
    setModel({ ...model });
    
    
};

export const handleSelectConfigController = (model,configurations, setModel, setMoveCount, setShowCongrats, setCurrentConfigSize) => (size) => {
        // console.log(configurations);
        const config = configurations.find(conf => conf.size === size);
        const newModel = new Model(config);
        setModel(newModel);
        setMoveCount(0);
        setShowCongrats(false);
        // console.log("true123");
        
        setCurrentConfigSize(size);
        
};
