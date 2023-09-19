export const Color = {
    ORANGE: "orange",
    GRAY: "gray",
    BLUE: "blue",
    GREEN: "green"
};
export class Direction {
    constructor(clockwise) {
        this.clockwise = clockwise;
    }
}
export class Group{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
export class Square{
    constructor(row,column){
        this.row=row;
        this.column=column;
        this.color=null;
    }
    setColor(color){
        this.color = color;
    }
}