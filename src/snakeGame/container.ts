import { Food } from './food'
import { Snake } from './snake'


class Container{
    dom!:HTMLElement | null;
    // 限定区域
    startX:number ;
    startY:number ;
    endX:number ;
    endY:number;
    foodList:Food[] = [];
    snakeList:Snake[] = [];

    constructor(){
        this.dom = document.getElementById('container');
        this.startX =  this.dom?.offsetLeft || 0
        console.log(this.dom?.offsetWidth);
        
        this.startY =  this.dom?.offsetTop || 0
        this.endX =  this.dom?.offsetWidth || 0
        this.endY = this.dom?.offsetHeight || 0
        
    }
    addFood(food:Food){
        this.foodList.push(food);
    }
    addSnake(snake:Snake){
        snake.init([this.startX,this.endX],[this.startY,this.endY])
       
        this.snakeList.push(snake)
    }
    eatFood(){
        this.snakeList[0].addBody();
        let bodys =  this.snakeList[0].dom?.querySelector('.snake-body')?.querySelector('div');
        let left = this.snakeList[0].offsetLeft
        let top = this.snakeList[0].offsetTop
    }
    // 判断蛇是否吃了实物食物


}

export { Container }
