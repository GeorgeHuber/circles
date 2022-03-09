//const FourierCircle = require("./circle");

let circles = [];
let fps = 60;
let frameNumber = 0;
let trail =[];




function setup() {
    createCanvas(1200, 800);
    frameRate(fps)
    background(0);
    let circle1 = new FourierCircle(
            {x:0,y:0}, 
            200,
            {
                freq:.2,
                shift:180,
                color: color(200,200,255),
                size: 10
            },
            null
        )
    let circle2 = new FourierCircle(
        {x:0,y:0}, 
        100,
        {
            freq:.5,
            shift:180,
            color: color(255,200,200),
            size: 10
        },
        circle1
    )
    let circle3 = new FourierCircle(
        {x:0,y:0}, 
        50,
        {
            freq:1,
            shift:180,
            color: color(200,255,200),
            size: 10
        },
        circle2
    )

    circles.push(circle1);
    circles.push(circle2);
    circles.push(circle3);
    
}


function drawCircles(){
    let t = frameNumber/fps;
    for (var i =0; i<circles.length;i++){
        let circle = circles[i];
        circle.drawCircle(t);
    }
    for (var i =0; i<circles.length;i++){
        let circle = circles[i];
        circle.drawPoint(t);
    }
}


function draw() {
    frameNumber+=1;
    //resets canvas
    background(0);
    drawCircles();
    //draws circle after setting color
    
    

    
}
