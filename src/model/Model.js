import Board from './Board';
import { Square, Color } from './Color.js';
// and other necessary imports
// export const Color = {
//     ORANGE: "orange",
//     GRAY: "gray",
//     BLUE: "blue",
//     GREEN: "green"
// };

// const { Color, Direction, Group, Square } = require('./Model.js');
// const { Board, configurations } = require('./Board.js');




export default class Model{
    constructor(configs){
        this.configs = configs;
        this.current = 0;
        this.moveCount = 0;
        this.board = new Board(this.configs);
        this.victory = false;
    }
    
    selectGroup(x,y){
        // this.x=x;
        // this.y=y
    
        this.board=new Board(this.configs);
        this.board.selectGroup(x,y);
        //this.moveCount=0;
    }
    // reset(){
        
    //     //this.board=new Board(this.configs);
    //     this.board.reset();
    //     this.moveCount=0;
    // }
    // rotate(direction) {
    //     //this.board=new Board(this.configs);
    //     this.board.rotate(direction);
    //     this.moveCount++;
    //     // Rotate the selected group in the given direction
    //     // Implementation depends on the exact structure and needs of your application
    // }
    // isSolved(){
    //     //this.board=new Board(this.configs);
    //     this.board.isSolved();
    //     //this.moveCount=0; 
    // }
}
// module.exports = {
//     Color,
//     Direction,
//     Group,
//     Square,
//     Board,
//     Model
// };