import Food from './food/food'

let apple = new Food('apple','red')

let element:Element | null = document.getElementById('main')

element?.insertAdjacentText('beforebegin','zhangsan')