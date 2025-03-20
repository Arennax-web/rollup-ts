class Snake{
    offsetLeft:number = 0;
    offsetTop:number = 0;
    dom!: HTMLElement | null;
    element!: HTMLElement | null;
    rangeX!: [number, number];
    rangeY!: [number, number];
    step:number;// 步长
    bodys:any;
    constructor(){
        this.element = document.getElementById('snake')
       this.dom = this.element!.querySelector('div');
       this.bodys = this.dom!.querySelector('div');
       this.step = 10;
    }
    eat(){
        
    }
    move(){

    }
    setX(x:number){
        console.log(this.offsetLeft);
        
        let width:number = 0
        if(this.dom?.style.width.replace('px','')){
            width = parseFloat(this.dom?.style.width.replace('px',''))
        }
        if(((this.offsetLeft || 0)+ x + width) >= this.rangeX[1] || ((this.offsetLeft || 0) + x - width) < this.rangeX[0]){
            console.log('gameOver');
            return 
        }
        
        
        this.offsetLeft = (this.offsetLeft || 0)  + x
        // 如果吃到了食物，身体长度+1
        if(this.offsetLeft===50){
            this.addBody();
        }

        for(let i = this.bodys?.length-1;i>0;i--){
            this.bodys[i].style.top = this.bodys[i-1].style.top;
            this.bodys[i].style.left = this.bodys[i-1].style.left;
        }

        this.dom!.style.left = this.offsetLeft + 'px'
    }
    setY(y:number){
        let width:number = 0
        if(this.dom?.style.width.replace('px','')){
            width = parseFloat(this.dom?.style.width.replace('px',''))
        }
        if(((this.offsetTop || 0)+ y + width) >= this.rangeY[1] || ((this.offsetTop || 0) + y - width) < this.rangeY[0]){
            console.log('gameOver');
            return 
        }
        this.offsetTop =(this.offsetTop || 0) + y

        for(let i = this.bodys?.length-1;i>0;i--){
            this.bodys[i].style.top = this.bodys[i-1].style.top;
            this.bodys[i].style.left = this.bodys[i-1].style.left;
        }
        this.dom!.style.top = this.offsetTop + 'px'
    }

    init(rangeX:[number, number],rangeY:[number, number]){
       this.rangeX = rangeX;
       this.rangeY = rangeY;
       
        //this.offsetLeft = Math.floor((Math.random()*(rangeX[1]/this.step-rangeX[0]/this.step))*this.step)
        //this.offsetTop = Math.floor((Math.random()*(rangeY[1]/this.step-rangeY[0]/this.step))*this.step)
        this.dom!.style.left = this.offsetLeft + 'px'
        this.dom!.style.top = this.offsetTop + 'px'

        window?.addEventListener('keydown',(e)=>{
           
            if(e.key === 'ArrowUp'){
                this.setY(-this.step)
            }if(e.key === 'ArrowDown'){
                this.setY(this.step)
            }if(e.key === 'ArrowLeft'){
                this.setX(-this.step)
            }if(e.key === 'ArrowRight'){
                this.setX(this.step)
            }
        })
    }

    addBody(){

        this.element!.insertAdjacentHTML('beforeend',`<div></div>`);

        this.bodys =this.element!.querySelectorAll('div');
    }

}

export {Snake}
