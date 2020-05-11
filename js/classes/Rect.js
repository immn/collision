export default class Rect {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.weight = this.w*this.h;
    }

    get left(){
        return this.x;
    }
    get right(){
        return this.x + this.w;
    }
    get top(){
        return this.y;
    }
    get bottom(){
        return this.y + this.h;
    }

    set left(value){
        this.x = value;
    }
    set right(value){
        this.x = value - this.w;
    }
    set top(value){
        this.y = value;
    }
    set bottom(value){
        this.y = value - this.h;
    }


}