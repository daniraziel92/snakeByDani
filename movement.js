const BtnStart = document.getElementById("start");
const Area = document.getElementById("A1");
let SnakeHead = document.getElementById("S1");
/*let B1 = document.getElementById("B1");
let B2 = document.getElementById("B2");
let B3 = document.getElementById("B3");
let B4 = document.getElementById("B4");*/
let Sdraw = [SnakeHead];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function MoveSnake(){
    const largo = snake.posx.length;
    const headx = snake.posx[0];
    const heady = snake.posy[0];
    /*const colf = colide(snake.posx[0],snake.posy[0],food.posx[0],food.posy[0])
    if(colf == true){
        snake.posx.push(snake.posx[largo-1]);
        snake.posy.push(snake.posy[largo-1]);
        food.posx[0] =  getRandomInt(2,48)*10
        food.posy[0] =  getRandomInt(2,48)*10
        snake.speed = 60 + 200 - (largo*5)
        score = score + 50 
        snake.stops()
        snake.move()
    }*/
    for(i=largo-1;i>0;i--){
        /*var lost = colide(snake.posx[0],snake.posy[0],snake.posx[i],snake.posy[i])
        if (lost == true){
            snake.stops()
            ctx.shadowColor ='#ff0000';
            ctx.font = "75px Arial";
            ctx.fillText("Game Over",250,258)
            btnStart.removeAttribute('hidden')
            }else{*/
        snake.posx[i]=snake.posx[i-1];
        snake.posy[i]=snake.posy[i-1];
    }

    const Limitx = Area.offsetWidth - 10;
    const LimitY = Area.offsetHeight - 20;
    switch (snake.dir)
        {
            case "left":
                if(snake.posx[0] < 20){snake.posx[0] = Limitx;
                }else{snake.posx[0] = headx-20;}
                break           
            case "right":
                if(snake.posx[0] > Limitx){snake.posx[0] = 0;
                }else{snake.posx[0] = 20 + headx;}
                break                                  
            case "up":
                if(snake.posy[0] < 10){snake.posy[0] = LimitY;
                }else{snake.posy[0] = heady-20;}
                break                          
            case "down":
                if(snake.posy[0] > LimitY){snake.posy[0] = 0;
                }else{snake.posy[0] = heady+20;}
                break
        }      
        //labelscore.innerText = score.toString()
}

function Create(item, index){
    let DivS = document.createElement("div");
    if(index === 0){
        DivS.setAttribute("class","SnakeHead");
        DivS.setAttribute("id","S1");
    }else{
        DivS.setAttribute("class","SnakeBody");
        DivS.setAttribute("id",'B'+index);    
    }
    Sdraw[index] = DivS;
    DivS.style.left = item+'px';
    DivS.style.top = snake.posy[index]+'px';
    Area.appendChild(DivS);
}

function DrawSnake(){
    const Snx = snake.posx;
    for(i=0;i<Snx.length;i++)
    {
        Create(Snx[i],i);
    }
    //Snx.forEach(Create());
}

function DeleteSnake(){
    Sdraw.forEach((e) => {
        const DivE = e;
        DivE.parentNode.removeChild(DivE);
    });
}


snake.MoveChange = function (posx,posy,dir){
    DeleteSnake();
    MoveSnake();
    DrawSnake();
 }

const changedir = (e) => {
    console.log(e)

    switch (e.key) {
        case ("a"||"ArrowLeft"):
           if(snake.dir != "right"){snake.dir="left"}
            return
        case ("s"||"ArrowDown"):
            if(snake.dir != "up"){snake.dir="down"}
            return
        case ("d"||"ArrowRight"):
            if(snake.dir != "left"){snake.dir="right"}
            return
        case ("w"||'ArrowUp'):
            if(snake.dir != "down"){snake.dir="up"}
            return
    }
}


function startgame(){

    snake.posx[0]=SnakeHead.offsetLeft;
    snake.posy[0]=SnakeHead.offsetTop;
    for (i=1; i<5;i++){
        snake.posx[i] = snake.posx[i-1] - 20;
        snake.posy[i]=SnakeHead.offsetTop;
    }
    DeleteSnake();
    DrawSnake();
    snake.speed=200;
    snake.dir="right";
    snake.Move();
    BtnStart.setAttribute('hidden',true);
}






BtnStart.addEventListener("click",()=>startgame());
addEventListener('keyup', changedir);