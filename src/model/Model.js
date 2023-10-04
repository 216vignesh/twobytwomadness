import Board from './Board';
import { Square, Color } from './Color.js';

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
}
