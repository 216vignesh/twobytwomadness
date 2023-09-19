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
        this.moveCount=0;
        this.selected = null;  // by default, no group is selected
    }
    selectGroup(row, col) {
        if(row < this.size - 1 && col < this.size - 1) {
            this.selectedGroup = [row, col];
        } else {
            this.selectedGroup = null;
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
    }
    
    

    isAllSameColor(g) {
        // Check if all squares in the group have the same color
        // Implementation depends on the exact structure and needs of your application
    }

    isSolved() {
        // Check if the board is solved
        // Implementation depends on the exact structure and needs of your application
    }
}

// Sample configurations for 4x4, 5x5, and 6x6 boards
const configurations = [
    new Configuration(4, [
        [Color.ORANGE, Color.GRAY, Color.BLUE, Color.GREEN],
        [Color.BLUE, Color.GREEN, Color.ORANGE, Color.GRAY],
        [Color.GRAY, Color.ORANGE, Color.GREEN, Color.BLUE],
        [Color.GREEN, Color.BLUE, Color.GRAY, Color.ORANGE]
    ]),
    new Configuration(5,[ [Color.ORANGE, Color.GRAY, Color.BLUE, Color.GREEN,Color.ORANGE],
        [Color.BLUE, Color.GREEN, Color.ORANGE, Color.GRAY,Color.BLUE],
        [Color.GRAY, Color.ORANGE, Color.GREEN, Color.BLUE,Color.GRAY],
        [Color.GREEN, Color.BLUE, Color.GRAY, Color.GREEN,Color.GREEN],
        [Color.GRAY,Color.ORANGE,Color.GREEN,Color.BLUE,Color.GRAY]
        ]),
        new Configuration(6,[ [Color.ORANGE, Color.GRAY, Color.BLUE, Color.GREEN,Color.ORANGE,Color.ORANGE],
            [Color.BLUE, Color.GREEN, Color.ORANGE, Color.GRAY,Color.BLUE,Color.ORANGE],
            [Color.GRAY, Color.ORANGE, Color.GREEN, Color.BLUE,Color.GRAY,Color.ORANGE],
            [Color.GREEN, Color.BLUE, Color.GRAY, Color.GREEN,Color.GREEN,Color.ORANGE],
            [Color.GRAY,Color.ORANGE,Color.GREEN,Color.BLUE,Color.GRAY,Color.ORANGE],
            [Color.GRAY,Color.ORANGE,Color.GREEN,Color.BLUE,Color.GRAY,Color.ORANGE]
            ])
    

    // ... add configurations for 5x5 and 6x6 as needed
];

// module.exports = {
//     Board,
//     configurations
// };
export { Board, configurations };

