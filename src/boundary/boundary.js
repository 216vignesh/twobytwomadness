export const drawBoard = (canvas, model, clickedCircle) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellSize = 400 / model.board.size;
    const squareSize = canvas.width / model.board.size;
    for (let i = 0; i < model.board.size; i++) {
        for (let j = 0; j < model.board.size; j++) {
          ctx.fillStyle = model.board.squares[i][j].color ? model.board.squares[i][j].color : "white";
            ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.strokeRect(j * squareSize, i * squareSize, squareSize, squareSize);
        }
    }
    
      for(let i = 1; i < model.board.size; i++) {
          for(let j = 1; j < model.board.size; j++) {
              const x = j * cellSize;
              const y = i * cellSize;
  
              ctx.beginPath();
              ctx.arc(x, y, cellSize / 6, 0, 2 * Math.PI);
              ctx.fillStyle = clickedCircle && model.board.selectedGroup && clickedCircle.i === i && clickedCircle.j === j ? "#FF0000" : "#FFF";
              ctx.fill();
              ctx.strokeStyle = "#000";
              ctx.lineWidth = 2;
              ctx.stroke();
          }
      }
      if (model.board.selectedGroup) {
        const [startRow, startCol] = model.board.selectedGroup;
        const startX = startCol * cellSize;
        const startY = startRow * cellSize;
        
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 4;
        ctx.strokeRect(startX, startY, 2 * cellSize, 2 * cellSize);
    }
          
    };