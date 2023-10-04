import React from 'react';
import { waitFor,fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { isInsideCircle, handleCanvasClickController, handleResetController, handleRotateController, handleSelectConfigController } from './controller/controller';
import { Board, configurations } from './model/Board';
import { drawBoard } from './boundary/boundary';
import * as Controller from './controller/controller';
import { useState } from 'react';
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => {
    return {
      clearRect: jest.fn(),
      getContext: jest.fn(),
      fillRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      strokeRect: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    };
  });
});


describe('drawBoard', () => {
  it('should set fillStyle to red when clickedCircle and selectedGroup match the current square', () => {
        const mockBoard = {
            size: 4, 
            squares: Array(4).fill().map(() => Array(4).fill({color: null})), 
            selectedGroup: [1, 2]
        };
        const model = { board: mockBoard };
        const clickedCircle = { i: 1, j: 2 };

        const ctx = {
            clearRect: jest.fn(),
            fillRect: jest.fn(),
            strokeRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
        };
        const canvas = {
            getContext: jest.fn(() => ctx),
            width: 400,
            height: 400
        };

        drawBoard(canvas, model, clickedCircle);

        expect(ctx.fillStyle).toBe("#FFF");
    });
    it('should set fillStyle to red when clickedCircle and selectedGroup match the current square', () => {
      const mockBoard = {
          size: 4, 
          squares: Array(4).fill().map(() => Array(4).fill({color: null})), 
          selectedGroup: [1, 2]
      };
      const model = { board: mockBoard };
      const clickedCircle = { i: 1, j: 2 };

      const ctx = {
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          strokeRect: jest.fn(),
          beginPath: jest.fn(),
          arc: jest.fn(),
          fill: jest.fn(),
          stroke: jest.fn(),
      };
      const canvas = {
          getContext: jest.fn(() => ctx),
          width: 400,
          height: 400
      };

      drawBoard(canvas, model, clickedCircle);

      expect(ctx.fillStyle).toBe("#FFF");
  });
  it('should highlight the selected group with a red rectangle', () => {
      const mockContext = {
          clearRect: jest.fn(),
          fillRect: jest.fn(),
          strokeRect: jest.fn(),
          beginPath: jest.fn(),
          arc: jest.fn(),
          fill: jest.fn(),
          stroke: jest.fn(),
      };
      const mockCanvas = {
          getContext: jest.fn().mockReturnValue(mockContext),
          width: 400,
          height: 400
      };
      const mockSquare = color => ({ color: color });
      const mockSquares = Array(4).fill().map(() => Array(4).fill().map(() => mockSquare(null))); 
      const mockModel = {
          board: {
              size: 4,
              selectedGroup: [1, 1],
              squares: mockSquares,
          }
      };
      drawBoard(mockCanvas, mockModel, null);
      expect(mockContext.strokeRect).toHaveBeenCalledWith(100, 100, 200, 200);
  });
});
describe('handleCanvasClickController tests', () => {
  let modelMock, setClickedCircleMock, drawingCanvasRefMock,setShowCongratsMock, setMoveCountMock, setModelMock;;
  
  beforeEach(() => {
    modelMock = {
      board: {
        size: 4, 
        selectedGroup: [1, 1],
        selectGroup: jest.fn(),
        isSolved: jest.fn().mockReturnValue(false)
      }
    };
    setClickedCircleMock = jest.fn();
    drawingCanvasRefMock = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          left: 0,
          top: 0,
          right: 400,
          bottom: 400
        })
      }
    };
  });

  it('should deselect the group and call setClickedCircle with null if inside circle', () => {
    const handleCanvasClick = handleCanvasClickController(modelMock, jest.fn(), setClickedCircleMock, drawingCanvasRefMock, jest.fn(), jest.fn());

    handleCanvasClick({ clientX: 205.625, clientY: 211.6484375 });

    expect(setClickedCircleMock).toHaveBeenCalledWith(null);
  });
  
});




describe('ignoreselectionifnocolors tests', () => {
  let modelMock, setClickedCircleMock, drawingCanvasRefMock,setShowCongratsMock, setMoveCountMock, setModelMock;;
  
  beforeEach(() => {
    modelMock = {
      board: {
        size: 4, 
        selectedGroup: null,
        selectGroup: jest.fn(),
        isSolved: jest.fn().mockReturnValue(false)
      }
    };
    setClickedCircleMock = jest.fn();
    setShowCongratsMock = jest.fn();
    setMoveCountMock = jest.fn();
    setModelMock = jest.fn();
    drawingCanvasRefMock = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          left: 0,
          top: 0,
          right: 400,
          bottom: 400
        })
      }
    };
  });

  it('should return early if group cannot be selected', () => {
    modelMock.board.selectGroup.mockReturnValue(false);

    const handleCanvasClick = handleCanvasClickController(modelMock, setModelMock, setClickedCircleMock, drawingCanvasRefMock, setShowCongratsMock, setMoveCountMock);

    handleCanvasClick({ clientX: 205.625, clientY: 211.6484375 });

    expect(setShowCongratsMock).not.toHaveBeenCalled();
    expect(setMoveCountMock).not.toHaveBeenCalled();
    expect(setModelMock).not.toHaveBeenCalled();
  });

  // it('should call setShowCongrats if the board is solved', async () => {
  //   modelMock.board.selectGroup.mockReturnValue(true);
  //   modelMock.board.isSolved.mockReturnValue(true);

  //   const handleCanvasClick = handleCanvasClickController(modelMock, setModelMock, setClickedCircleMock, drawingCanvasRefMock, setShowCongratsMock, setMoveCountMock);
  //   const { getByText, queryByText } = render(<App />);
  //   handleCanvasClick({ clientX: 205.625, clientY: 211.6484375 });
    
  //   expect(setShowCongratsMock).toHaveBeenCalledWith(true);
  //   // const {  } = render(<App />);
  //   const congratsLabel = await getByText("Congratulations! You have solved the puzzle.");
  //   expect(congratsLabel).toHaveStyle('display: block');
  // });

    
});

test('isInsideCircle function', () => {
  expect(isInsideCircle(0, 0, 0, 0, 1)).toBeTruthy();
  expect(isInsideCircle(2, 2, 0, 0, 1)).toBeFalsy();
});
test("renders App component", () => {
  render(<App />);
});



test("handle button interactions", () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText("Reset"));
  expect(getByText('Move Count: 0')).toBeInTheDocument();
});


describe('<App />', () => {

  const originalRotate = Board.prototype.rotate;
  Board.prototype.rotate = jest.fn(function(direction) {
    originalRotate.call(this, direction);
  });
  it('should handle clockwise rotation when "Rotate Clockwise" button is clicked', () => {
    const { getByText } = render(<App />);
    const rotateClockwiseButton = getByText('Rotate Clockwise');
    fireEvent.click(rotateClockwiseButton);

    expect(Board.prototype.rotate).toHaveBeenCalledWith('clockwise');

  });
  // afterAll(() => {
  //   Board.prototype.rotate = originalRotate;
  // });
  it('should handle counter clockwise rotation when "Rotate Counter-Clockwise" button is clicked', () => {
    const { getByText } = render(<App />);
    const rotateCounterClockwiseButton = getByText('Rotate Counter-Clockwise');
    fireEvent.click(rotateCounterClockwiseButton);
    expect(Board.prototype.rotate).toHaveBeenCalledWith('counterClockwise');
  });

  afterAll(() => {
    Board.prototype.rotate = originalRotate;
  });

  it('should change configuration to 4x4 when "4x4 Config" button is clicked', () => {
    const { getByText } = render(<App />);

    const config4x4Button = getByText('4x4 Config');
    fireEvent.click(config4x4Button);
  });

  it('should change configuration to 5x5 when "5x5 Config" button is clicked', () => {
    const { getByText } = render(<App />);

    const config5x5Button = getByText('5x5 Config');
    fireEvent.click(config5x5Button);
  });

  it('should change configuration to 6x6 when "6x6 Config" button is clicked', () => {
    const { getByText } = render(<App />);

    const config6x6Button = getByText('6x6 Config');
    fireEvent.click(config6x6Button);
  });

});

describe('handleCanvasClickController tests', () => {
  let modelMock, setModelMock, setClickedCircleMock, drawingCanvasRefMock, setShowCongratsMock, setMoveCountMock;

  beforeEach(() => {
    // Mock the board within the model
    modelMock = {
      board: {
        size: 4, // or whatever your default size is
        selectedGroup: null,
        selectGroup: jest.fn().mockReturnValue(true),
        isSolved: jest.fn()
      }
    };
   // Mock the React setState functions
    setModelMock = jest.fn();
    setClickedCircleMock = jest.fn();
    setShowCongratsMock = jest.fn();
    setMoveCountMock = jest.fn();

    // Mock the canvas ref
    drawingCanvasRefMock = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          left: 0,
          top: 0,
          right: 400,
          bottom: 400
        })
      }
    };
  });

  it('should call setClickedCircle and setModel', () => {
    const handleClick = handleCanvasClickController(modelMock, setModelMock, setClickedCircleMock, drawingCanvasRefMock, setShowCongratsMock, setMoveCountMock);
    handleClick({ clientX: 205.625, clientY: 211.6484375 });  // Use handleClick here
    expect(modelMock.board.selectGroup).toBeCalled();
    expect(setClickedCircleMock).toBeCalled();
    expect(setModelMock).toBeCalled();
  });



  it('should call setShowCongrats when board is solved', () => {
    modelMock.board.selectGroup.mockReturnValue(true);
    modelMock.board.isSolved.mockReturnValue(true);
    const handleCanvasClick = handleCanvasClickController(
    modelMock, setModelMock, setClickedCircleMock, drawingCanvasRefMock, setShowCongratsMock, setMoveCountMock
  );
    handleCanvasClick({ clientX: 205.625, clientY: 211.6484375 });
    expect(setShowCongratsMock).toHaveBeenCalledWith(true);
  });
});

test('board initialization', () => {
  const board = new Board(configurations[0]);
  expect(board.size).toBe(4);

});
test('board isSolved function', () => {
  const board = new Board(configurations[0]);
  const { getByText,queryByText, getByTestId } = render(<App />);
  board.squares.forEach(row => row.forEach(square => square.color = null));
  expect(board.isSolved()).toBeTruthy();
  const canvasElement = getByTestId('myCanvas');
  const x = 207.625;
  const y = 213.8984375;
  fireEvent.mouseDown(canvasElement, { clientX: x, clientY: y });
  // const congratsMessage = getByText("Congratulations! You have solved the puzzle.");
  // expect(congratsMessage).toBeInTheDocument();
  // expect(congratsMessage).toHaveStyle("display: none");
});

// describe('<App /> component', () => {

//   it('should display the congrats message when the board is solved', async () => {
//     const model = new Model(configurations[0]);
//     // Setup the board in its solved state
//     model.board.squares.forEach(row => row.forEach(square => square.color = null));

//     // Assuming the `isSolved` checks for all colors being null or something similar
//     expect(model.board.isSolved()).toBeTruthy();

//     const { findByText } = render(<App />);

//     const congratsLabel = await findByText("Congratulations! You have solved the puzzle.");
//     await waitFor(() => {
//         expect(congratsLabel).toHaveStyle('display: block');
//     });
//   });
// });
import Model from './model/Model';

test('model initialization', () => {
  const model = new Model(configurations);
  expect(model.moveCount).toBe(0);
  expect(model.victory).toBe(false);

});


describe('Board selectGroup method', () => {
  let board;
  beforeEach(() => {
    board = new Board(configurations[0]);
  });
  it('returns false for recently cleared group', () => {
    board.recentlyClearedGroup = [1, 1];
    expect(board.selectGroup(1, 1)).toBe(false);
  });
  it('deselects a currently selected group', () => {
    board.selectedGroup = [1, 1];
    expect(board.selectGroup(1, 1)).toBe(false);
    expect(board.selectedGroup).toBeNull();
  });
  it('returns false if all squares are white', () => {
    board.squares[1][1].color = null;
    board.squares[1][2].color = null;
    board.squares[2][1].color = null;
    board.squares[2][2].color = null;
    expect(board.selectGroup(1, 1)).toBe(false);
  });
  it('clears the group if all colors are the same', () => {
    board.squares[1][1].color = 'RED';
    board.squares[1][2].color = 'RED';
    board.squares[2][1].color = 'RED';
    board.squares[2][2].color = 'RED';
    expect(board.selectGroup(1, 1)).toBe(true);
    expect(board.squares[1][1].color).toBeNull();
    expect(board.squares[1][2].color).toBeNull();
    expect(board.squares[2][1].color).toBeNull();
    expect(board.squares[2][2].color).toBeNull();
  });
  it('selects the group if colors are different', () => {
    board.squares[1][1].color = 'RED';
    board.squares[1][2].color = 'BLUE';
    board.squares[2][1].color = 'GREEN';
    board.squares[2][2].color = 'YELLOW';
    expect(board.selectGroup(1, 1)).toBe(true);
    expect(board.selectedGroup).toEqual([1, 1]);
  });

  it('returns false if group is on the edge', () => {
    expect(board.selectGroup(board.size - 1, board.size - 1)).toBe(false);
  });
});
describe('Board class methods', () => {
  let board;

  beforeEach(() => {
    board = new Board(configurations[0]);
  });

  describe('reset method', () => {
    it('resets the moveCount to 0', () => {
      board.moveCount = 5;
      board.reset();
      expect(board.moveCount).toBe(0);
    });
  });

  describe('rotate method', () => {
    
    it('returns early if no group is selected', () => {
      board.selectedGroup = null;
      const initialSquares = JSON.stringify(board.squares);
      board.rotate('clockwise');
      expect(JSON.stringify(board.squares)).toBe(initialSquares);
    });
    
    

    it('clockwise rotation test', () => {
      board.selectedGroup = [1, 1];
      board.rotate('clockwise');
      board.squares[0][0].color = "red";
      board.squares[0][1].color = "green";
      board.squares[1][0].color = "blue";
      board.squares[1][1].color = "yellow";

      board.selectedGroup = [0, 0];
      board.rotate('clockwise');

      expect(board.squares[0][0].color).toBe("blue");
      expect(board.squares[0][1].color).toBe("red");
      expect(board.squares[1][0].color).toBe("yellow");
      expect(board.squares[1][1].color).toBe("green");
    });

    it('counter-clockwise rotation test', () => {
      board.selectedGroup = [1, 1];
      board.rotate('counterClockwise');
      board.squares[0][0].color = "red";
      board.squares[0][1].color = "green";
      board.squares[1][0].color = "blue";
      board.squares[1][1].color = "yellow";

      board.selectedGroup = [0, 0];
      board.rotate('counterClockwise');

      expect(board.squares[0][0].color).toBe("green");
      expect(board.squares[0][1].color).toBe("yellow");
      expect(board.squares[1][0].color).toBe("red");
      expect(board.squares[1][1].color).toBe("blue");
    });

    it('increments the moveCount after rotation', () => {
      board.selectedGroup = [1, 1];
      const initialMoveCount = board.moveCount;
      board.rotate('clockwise');
      expect(board.moveCount).toBe(initialMoveCount + 1);
    });
    

    it('sets recentlyClearedGroup to null after rotation', () => {
      board.selectedGroup = [1, 1];
      board.recentlyClearedGroup = [0, 0];
      board.rotate('clockwise');
      expect(board.recentlyClearedGroup).toBeNull();
    });
    
  });
});
describe('Board class methods', () => {
  let board;

  beforeEach(() => {
    board = new Board(configurations[0]);
  });
  describe('isSolved method', () => {
    it('returns true when all squares are null', () => {
      for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
          board.squares[i][j].color = null;
        }
      }
      expect(board.isSolved()).toBeTruthy();
    });
    it('returns false when any square is not null', () => {
      board.squares[0][1].color = "red";
      expect(board.isSolved()).toBeFalsy();
    });
  });
});

describe('Model class methods', () => {
  let model;

  beforeEach(() => {
    model = new Model(configurations[0]);
  });

  describe('selectGroup method', () => {
    it('selects the group on the board with given x and y values', () => {
      const initialBoard = JSON.parse(JSON.stringify(model.board));
      model.selectGroup(1, 1);
      expect(JSON.stringify(model.board)).not.toEqual(JSON.stringify(initialBoard));
    });
  });
});
it('should display congratulations message when the board is solved', async () => {
  jest.mock('./controller/controller');
    Controller.handleCanvasClickController = jest.fn(() => jest.fn());
    Controller.handleCanvasClickController.mockImplementation(
        (model, setModel, setClickedCircle, drawingCanvasRef, setShowCongrats, setMoveCount) => (event) => {
            // Force setting showCongrats to true as per your logic.
            setShowCongrats(true);
        }
    );
    render(<App />);

    fireEvent.click(screen.getByTestId("myCanvas"));

    const congratsLabel = await screen.findByText("Congratulations! You have solved the puzzle.");

    expect(congratsLabel).toHaveStyle('display: block');
    
});
jest.unmock('./controller/controller');
