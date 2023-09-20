// Board.js

// const { Square, Color } = require('./Model.js');
import { Square, Color } from './Color.js';
import Model from './Model.js';
// and other necessary imports
console.log(Square)

class Configuration {
    constructor(size, colors) {
        this.size = size;
        this.colors = colors;  // 2D array of colors
    }
}

export default class Board {
    constructor(config) {
        this.size = config.size;
        this.selectedGroup = null;
        this.squares = this._loadConfiguration(config);
        this.clearedGroups = new Set();
        this.deselectedGroups = new Set();
        this.moveCount=0;
        this.selected = null;  // by default, no group is selected
    }
    selectGroup(row, col) {
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
            return true;
        } else {
            this.selectedGroup = null;
            return false;
        }
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

    isEmpty(g) {
        // Check if the group of squares are empty
        // Implementation depends on the exact structure and needs of your application
    }
    checkAndClearMatchingGroups() {
        const size = this.size;
    
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - 1; j++) {
                
                if (
                    this.squares[i][j].color === this.squares[i+1][j].color&&
                    this.squares[i][j].color === this.squares[i][j+1].color &&
                    this.squares[i][j].color === this.squares[i+1][j+1].color
                ) {
                    
                    
                    // If all colors are the same in this 2x2 group, clear them.
                    this.squares[i][j].color = null; 
                    this.squares[i+1][j].color = null;
                    this.squares[i][j+1].color = null;
                    this.squares[i+1][j+1].color = null;
                    this.selectedGroup=null;
                    
                    
                    
                }
                
            }
        }
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
        } else if (direction === 'counterClockwise') {
            

            const temp = newSquares[i][j];
            newSquares[i][j] = newSquares[i][j + 1];
            newSquares[i][j + 1] = newSquares[i + 1][j + 1];
            newSquares[i + 1][j + 1] = newSquares[i + 1][j];
            newSquares[i + 1][j] = temp;
        }
    
        this.squares = newSquares;  // update the squares with the new modified copy
        this.moveCount++;
        
        this.checkAndClearMatchingGroups();
        // this.clearedGroups.clear();
    }
    
    

    isAllSameColor(g) {
        // Check if all squares in the group have the same color
        // Implementation depends on the exact structure and needs of your application
    }

    isSolved() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.squares[i][j].color !== null) {
                    return false;
                }
            }
        }
        return true;
    }
}

// Sample configurations for 4x4, 5x5, and 6x6 boards
const configurations = [
    new Configuration(4, [
        [Color.GREEN, Color.ORANGE, Color.GRAY, Color.BLUE],
        [Color.GREEN, Color.GRAY, Color.ORANGE, Color.BLUE],
        [Color.GREEN, Color.ORANGE, Color.GRAY, Color.BLUE],
        [Color.GREEN, Color.GRAY, Color.ORANGE, Color.BLUE]
    ]),
    new Configuration(5,[ [Color.ORANGE, Color.RED, Color.PURPLE, Color.GREEN,Color.BLUE],
        [Color.RED, Color.ORANGE, Color.GREEN, Color.BLUE,Color.YELLOW],
        [Color.PURPLE, Color.GREEN, Color.ORANGE, Color.YELLOW,Color.PURPLE],
        [Color.GREEN, Color.BLUE, Color.YELLOW, Color.ORANGE,Color.RED],
        [Color.BLUE,Color.YELLOW,Color.PURPLE,Color.RED,Color.WHITE]
        ]),
        new Configuration(6,[ [Color.RED, Color.PINK, Color.PURPLE, Color.GREEN,Color.YELLOW,Color.RED],
            [Color.YELLOW, Color.ORANGE, Color.BLUE, Color.BLUE,Color.ORANGE,Color.LIGHT_BLUE],
            [Color.GREEN, Color.BROWN, Color.LIGHT_BLUE, Color.PURPLE,Color.BROWN,Color.PINK],
            [Color.PINK, Color.BROWN, Color.PURPLE, Color.LIGHT_BLUE,Color.BROWN,Color.GREEN],
            [Color.LIGHT_BLUE,Color.YELLOW,Color.BLUE,Color.BLUE,Color.ORANGE,Color.YELLOW],
            [Color.RED,Color.YELLOW,Color.GREEN,Color.PURPLE,Color.PINK,Color.RED]
            ])
    

    // ... add configurations for 5x5 and 6x6 as needed
];

// module.exports = {
//     Board,
//     configurations
// };
export { Board, configurations };

