// Board.js
import { Square, Color } from './Color.js';
import Model from './Model.js';
import { config_4x4, config_5x5, config_6x6 } from '../configs.js';
// and other necessary imports
// console.log(Square)

class Configuration {
    constructor(size, colors) {
        this.size = size;
        this.colors = colors;  // 2D array of colors
    }
}
function transformConfigTo2DArray(config) {
    const size = parseInt(config.numRows);
    const result = Array(size).fill().map(() => Array(size).fill(null));

    config.baseSquares.forEach(square => {
        const row = parseInt(square.row);
        const col = parseInt(square.column);
        result[row][col] = square.color.toUpperCase();
    });

    return result;
}


export default class Board {
    constructor(config) {
        this.size = config.size;
        this.selectedGroup = null;
        this.squares = this._loadConfiguration(config);
        //this.onSolvedCallback = onSolvedCallback;
        this.clearedGroups = new Set();
        this.deselectedGroups = new Set();
        this.moveCount=0;
        this.selected = null;  // by default, no group is selected
        this.recentlyClearedGroup = null;
    }
    selectGroup(row, col) {
        if (this.recentlyClearedGroup && this.recentlyClearedGroup[0] === row && this.recentlyClearedGroup[1] === col) {
            return false;
        }
        if (this.selectedGroup && this.selectedGroup[0] === row && this.selectedGroup[1] === col) {
            this.selectedGroup = null;
            return false;  // Return false to indicate deselection
        }
        if (
            this.squares[row][col].color === null &&
            this.squares[row+1][col].color === null &&
            this.squares[row][col+1].color === null &&
            this.squares[row+1][col+1].color === null
        ) {
            // If all colors are white, do not select this group and maybe return a flag
            return false;
        }
        
        if(row < this.size - 1 && col < this.size - 1) {
            this.selectedGroup = [row, col];
            
            // If this group was selected and all colors are the same, clear them.
            if (this.squares[row][col].color === this.squares[row+1][col].color &&
                this.squares[row][col].color === this.squares[row][col+1].color &&
                this.squares[row][col].color === this.squares[row+1][col+1].color
            ) {
                this.clearGroup(row, col);
                
                
                return true;
            }
            
            return true;
        } else {
            this.selectedGroup = null;
            return false;
        }
    }
    clearGroup(i, j) {
        this.moveCount++;
        this.squares[i][j].color = null; 
        this.squares[i+1][j].color = null;
        this.squares[i][j+1].color = null;
        this.squares[i+1][j+1].color = null;
        this.recentlyClearedGroup = [i, j];
        this.selectedGroup = null;
        
    }    

    _loadConfiguration(config) {
        const squares = [];
        for (let i = 0; i < this.size; i++) {
            squares[i] = [];
            for (let j = 0; j < this.size; j++) {
                const square = new Square(i, j);
                square.setColor(config.colors[i][j]);
                squares[i][j] = square;
                
            }
        }
        return squares;
    }
    reset()
    {
        this.moveCount=0;
    }

    
    rotate(direction) {
        if (!this.selectedGroup) return;
    
        const [i, j] = this.selectedGroup;  // Top-left coordinates of the selected group
        const newSquares = this.squares.map(row => [...row]);
        if (direction === 'clockwise') {
            const temp = newSquares[i][j];
            newSquares[i][j] = newSquares[i + 1][j];
            newSquares[i + 1][j] = newSquares[i + 1][j + 1];
            newSquares[i + 1][j + 1] = newSquares[i][j + 1];
            newSquares[i][j + 1] = temp;
        } 
        if (direction === 'counterClockwise') {
            

            const temp = newSquares[i][j];
            newSquares[i][j] = newSquares[i][j + 1];
            newSquares[i][j + 1] = newSquares[i + 1][j + 1];
            newSquares[i + 1][j + 1] = newSquares[i + 1][j];
            newSquares[i + 1][j] = temp;
        }
    
        this.squares = newSquares;  // update the squares with the new modified copy
        this.moveCount++;
        
        //this.checkAndClearMatchingGroups();
        this.recentlyClearedGroup = null;
        // this.clearedGroups.clear();
    }
    

    isSolved() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.squares[i][j].color !== null) {
                    // console.log("isfail");
                    return false;
                }
            }
        }
        //console.log("isSolved true");
        return true;
    }
}
const transformed_4x4 = transformConfigTo2DArray(config_4x4);
const transformed_5x5 = transformConfigTo2DArray(config_5x5);
const transformed_6x6 = transformConfigTo2DArray(config_6x6);
const configurations = [
    new Configuration(4, transformed_4x4),
    new Configuration(5,transformed_5x5),
    new Configuration(6,transformed_6x6)
];

export { Board, configurations };

