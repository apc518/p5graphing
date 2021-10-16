let resolution = 1000;
let xRange = 50;
let yRange = 50;
let centerPoint = {
    x: 0,
    y: 0
}
let mouseInit = {
    x: 0,
    y: 0,
    centerX: centerPoint.x,
    centerY: centerPoint.y
}

let elem = document.getElementById("expression");

let canvasWidth;
let canvasHeight;

elem.oninput = (e) => {
    let f = parse(elem.value);
    if(f) userFunction = f;
};

function userFunction(x){
    return x*x;
}

function xInput(portion){
    // takes portion across the screen (0 to 1)
    // returns the x value that should be inputted there
    let pixel = portion * canvasWidth;
    let delta = pixel - centerPoint.x;
    return xRange * delta / canvasWidth;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    centerPoint.x = canvasWidth / 2;
    centerPoint.y = canvasHeight / 2;
}

// function windowResized(){
//     resizeCanvas(canvasWidth, canvasHeight);
// }

function mousePressed(){
    // set up for dragging the graph around
    // record where the center point begins and where the mouse begins
    mouseInit.x = mouseX;
    mouseInit.y = mouseY;
    mouseInit.centerX = centerPoint.x;
    mouseInit.centerY = centerPoint.y;
}

function keyPressed(){
    // plus sign
    if(keyCode == 107 || (keyCode == 187 && keyIsDown(16))){
        xRange /= 1.5;
        yRange /= 1.5;
    }
    // minus sign
    else if(keyCode == 189 || keyCode == 109){
        xRange *= 1.5;
        yRange *= 1.5;
    }
}

function mouseWheel(e){
    if(Math.sign(e.delta) < 0){
        xRange /= 1.5;
        yRange /= 1.5;
    }
    else{
        xRange *= 1.5;
        yRange *= 1.5;
    }
}

function draw(){
    background(30, 30, 40);
    noFill();

    // axes
    stroke(70);
    strokeWeight(1);
    line(centerPoint.x, windowHeight, centerPoint.x, 0);
    line(0, centerPoint.y, windowWidth, centerPoint.y);
    
    // function
    stroke(255);
    strokeWeight(3);
    if(userFunction){
        for(let i = 0; i < resolution; i++){
            let x0 = xInput(i / resolution);
            let x1 = xInput((i+1) / resolution);
            line(
                i * canvasWidth / resolution,
                centerPoint.y - (canvasHeight / yRange) * userFunction(x0),
                (i+1) * canvasWidth / resolution,
                centerPoint.y - (canvasHeight / yRange) * userFunction(x1),
            );
        }
    }

    // dragging the graph around
    if(mouseIsPressed && document.activeElement !== elem){
        centerPoint.x = mouseInit.centerX + mouseX - mouseInit.x;
        centerPoint.y = mouseInit.centerY + mouseY - mouseInit.y;
    }
}
