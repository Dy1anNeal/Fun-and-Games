//initialising variables
let first = true;
let rotateCheck = false;
let colorCheck = 0;
let x = 0;
let y = 0;
let ax = 50;
let ay = 50;
let score = 0;
let upCheck = 0; 
let leftCheck = 0; 
let rightCheck = 0; 
let downCheck = 0; 
let positionX = [];
let positionY = [];
let timesMoved = 0;
let len;

let bodyPieces = []
//conecting to html elements
const body = document.querySelector('#bod')
const frame = document.querySelector('#frame');
const joycon = document.querySelector('#joycon');
const joyconTop = document.querySelector('#joyconTop');
const joyconBottom = document.querySelector('#joyconBottom');
const xButton = document.querySelector('#xButton');
const yButton = document.querySelector('#yButton');
const aButton = document.querySelector('#aButton');
const bButton = document.querySelector('#bButton') ;
const upButton = document.querySelector('#upButton');
const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');
const downButton = document.querySelector('#downButton') ;

const ssButton = document.querySelector('#ssButton');
const flash = document.querySelector('#flash');

const snake = document.querySelector('#snake');
const apple = document.querySelector('#apple');
const deathScreen = document.querySelector('#deathScreen')
const retryButton = document.querySelector('#retryButton')

//button function for the retry button
retryButton.addEventListener('click',retry)

//text boxes used for tracking certain values
const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
const text3 = document.querySelector('#text3');
const text4 = document.querySelector('#text4');
const scoreText = document.querySelector('#scoreText')
const direction = document.querySelector('#direction')
//colors used to chnage the joycons color
const colors = [
    {name: "red",
    compColor: "rgb(179, 0, 0)"},
    {name: "blue",
    compColor: "rgb(35, 3, 181)"},
    {name: "rgb(53, 255, 53)",
    compColor: "rgb(0, 186, 28)"},
    {name: "orange",
     compColor: "rgb(189, 114, 45)"}
];

//button functions for x and y 
xButton.onclick = rotate;
yButton.onclick = colorChange;
//button functions for the arrow buttons on the left joycon
upButton.addEventListener('click',moveUp);
leftButton.addEventListener('click',moveLeft);
rightButton.addEventListener('click',moveRight);
downButton.addEventListener('click',moveDown);
//button function for the screenshot button
ssButton.onclick = screenShot;
//function to rotate the entire joycon frame
function rotate() {
    if (rotateCheck === false){
        frame.style.transform = "rotate(90deg)";
        rotateCheck = true;
    }else{
        frame.style.transform = "rotate(0deg)";
        rotateCheck = false;
    }
};
//function to change the joycon color
function colorChange() {
    joycon.style.background = "linear-gradient(90deg,"+colors[colorCheck].name+" 0%,"+colors[colorCheck].name+" 90%,"+colors[colorCheck].compColor+")";
    joyconTop.style.background = "radial-gradient(circle at bottom left,"+colors[colorCheck].name+" 0%,"+colors[colorCheck].name+" 64%, black 90%)";
    joyconBottom.style.background = "radial-gradient(circle at top left,"+colors[colorCheck].name+" 0%,"+colors[colorCheck].name+" 64%, black 90%)";
    if (colorCheck < colors.length - 1) {
        colorCheck ++;
    }else{
        colorCheck = 0;
    };
}

function screenShot() {
    flash.style.animation = "screenshot 4s linear 1"
}

//-SNAKE-MOVEMENT--------------------------------------------------------------//
//upwards movement
function moveUp() {
    //check to make sure the snake cannot move 180 degrees
    if (downCheck === 1){
        //pass
    }else{
        //setting all direction checks to 0 apart from the upwards direction to stop any other movement
        upCheck ++;
        leftCheck = 0;
        rightCheck = 0;
        downCheck = 0;
        if (upCheck === 1){
            up()
        }else if (upCheck > 1){
            up()
            upCheck = 0;
        }
    }
}
function up(){
    if (upCheck === 1){
        //changing the y corrdinate of the snake
        y -= 10;
        snake.style.transform = "translate(" + x + "px, " + y + "px)";
        //checking colision
        appleColision(x, y);
        colisionY(x, y);
        //delay to allow visable movement
        setTimeout(up,100)
        //check to see if the snake reaches the boundry of the screen
        if (y < 0){
            y = Math.floor(window.innerHeight/10) * 10;
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "up"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
        }else{
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "up"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
            //pass
        }
    }else{
        //pass
    }
}
//left movement
function moveLeft() {
    if (rightCheck === 1){
        //pass
    }else{
        upCheck = 0;
        leftCheck ++;
        rightCheck = 0;
        downCheck = 0;
        if (leftCheck === 1){
            left()
        }else if (leftCheck > 1){
            left()
            leftCheck = 0;
        }
    }
}
function left(){
    if (leftCheck === 1){
        x -= 10;
        snake.style.transform = "translate(" + x + "px, " + y + "px)";
        appleColision(x, y);
        colisionX(x, y);
        setTimeout(left,100)
        if (x < 0){
            x = Math.floor(window.innerWidth/10) * 10;
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "left"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
        }else{
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "left"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
            //pass
        }
    }else{
        //pass
    }
}
//right movement 
function moveRight() {
    if (leftCheck === 1){
        //pass
    }else{
        upCheck = 0;
        leftCheck = 0;
        rightCheck ++;
        downCheck = 0;
        if (rightCheck === 1){
            right()
        }else if (rightCheck > 1){
            right()
            rightCheck = 0;
        }
    }
}
function right(){
    if (rightCheck === 1){
        x += 10;
        snake.style.transform = "translate(" + x + "px, " + y + "px)";
        appleColision(x, y);
        colisionX(x, y);
        setTimeout(right,100)
        if (x > window.innerWidth){
            x = 0;
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "right"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
        }else{
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "right"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
            //pass
        }
    }else{
        //pass
    }
}
//downwards movement 
function moveDown() {
    if (upCheck === 1){
        //pass
    }else{
        upCheck = 0;
        leftCheck = 0;
        rightCheck = 0;
        downCheck ++;
        if (downCheck === 1){
            down()
        }else if (downCheck > 1){
            down()
            downCheck = 0;
        }
    }
}
function down(){
    if (downCheck === 1){
        y += 10;
        snake.style.transform = "translate(" + x + "px, " + y + "px)";
        appleColision(x, y);
        colisionY(x, y);
        setTimeout(down,100)
        if (y > window.innerHeight){
            y = 0;
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "down"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
        }else{
            if (first===true){
                //pass
            }else{
                ;
                direction.innerText = "down"
                for (let i = 0; i<bodyPieces.length; i++){
                    bodyPieces[i].style.transform = "translate(" + positionXNew[i+1] + "px, " + positionYNew[i+1] + "px)";
                }
            }
            //pass
        }
    }else{
        //pass
    }
}
//-APPLE--------------------------------------------------------------//
//function to move the apple each time it is collected
function appleMove() {
    axNew = Math.floor(Math.random()*window.innerWidth/10)*10;
    ayNew = Math.floor(Math.random()*window.innerHeight/10)*10;
    return (axNew, ayNew)
}
//function to change the coordinates used for the snake head and bodypieces
function coordinateChange(sx,sy,ax,ay) {
    text1.innerText = "sx  =  " + sx;
    text2.innerText = "sy  =  " + sy;
    text3.innerText = "ax  =  " + ax;
    text4.innerText = "ay  =  " + ay;
    positionY.push(y);
    positionX.push(x);
    timesMoved ++;
    //setting the length of the array = to the length of the snake
    Len = timesMoved - score -1;
    positionXNew = positionX.slice(Len);
    positionYNew = positionY.slice(Len);
    positionXNew = positionXNew.reverse();
    positionYNew = positionYNew.reverse();
    body.innerText = positionXNew + " /--/ " + positionYNew;

    return (positionXNew,positionYNew)
}
//function to detect if the snake colides with the apple
function appleColision(sx, sy) {
    if (sx === ax && sy === ay){
        appleMove();
        ax = axNew;
        ay = ayNew;
        apple.style.transform = "translate(" + ax + "px, " + ay + "px)";
        coordinateChange(sx,sy,ax,ay);
        score ++;
        scoreText.innerText = "Score = " + score; 
        //creates a new snake square to add on to the back of the snake
        var square = document.createElement('div');
        square.className = `snake snakeBody${score}`;
        square.id = `snakeBody${score}`
        document.body.appendChild(square);
        const snakeBody = document.querySelector(`.snakeBody${score}`);
        bodyPieces.push(snakeBody);
        first = false;
    }else{
        coordinateChange(sx,sy,ax,ay);
    }
    return (positionXNew,positionYNew)
}
//-DEATH--------------------------------------------------------------//
//function for what hapens upon losing the game
function death(){
    flash.style.animation = "death 4s linear 1";
    deathScreen.style.transform = "scale(1)";
    upCheck = 0;
    leftCheck = 0;
    rightCheck = 0;
    downCheck = 0;
}
//function to check collision of the snake with itself when travelling in the x axis
function colisionX(sx,sy){
    if (first === false){
        arrayCheckX = positionXNew.slice(1)
        for (let z=0; z < arrayCheckX.length; z++){
            if (arrayCheckX[z] === sx){
                if (positionYNew[z+1] === sy){
                    death()
                }else{
                    //pass
                }
            }else{
                //pass
            }
        }
    }else{
        //pass
    }
}
//function to check collision of the snake with itself when travelling in the y axis
function colisionY(sx,sy){
    if (first === false){
        arrayCheckY = positionYNew.slice(1)
        for (let z=0; z < arrayCheckY.length; z++){
            if (arrayCheckY[z] === sy){
                if (positionXNew[z+1] === sx){
                    death()
                }else{
                    //pass
                }
            }else{
                //pass
            }
        }
    }else{
        //pass
    }
}
//function to reset all values to the initial values 
function retry(){
    deathScreen.style.transform = "scale(0)";
    snake.style.transform = "translate(0px, 0px)";

    for (let i = 0; i<bodyPieces.length; i++){
        bodyPieces[i].style.transform = "translate(-10px, -10px)";
    }

    score = 0;
    x = 0;
    y = 0;
    sx = 0;
    sy = 0;
    upCheck = 0;
    leftCheck = 0;
    rightCheck = 0;
    downCheck = 0;
    timesMoved = 0;
    positionX = [];
    positionY = [];
    bodyPieces = [];
    first = true;
    positionXNew = [];
    positionYNew = [];

    scoreText.innerText = "Score = " + score; 
    text1.innerText = "sx  =  " + sx;
    text2.innerText = "sy  =  " + sy;
    body.innerText = positionXNew + " /--/ " + positionYNew;
    flash.style.animation = "";
}


