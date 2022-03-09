//const FourierCircle = require("./circle");

let circles = [];
let fps = 60;
let frameNumber = 0;
let trail =[];
let width = 1200;
let height = 800;

let trailCircle;



function setup() {
    createCanvas(width, height);
    frameRate(fps)
    background(0);
    
    let circle1 = new FourierCircle(
            {x:-height/2,y:0}, 
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
    
    let circle4 = new FourierCircle(
        {x:0,y:0}, 
        25,
        {
            freq:1.2,
            shift:180,
            color: color(200,255,255),
            size: 8
        },
        circle3
    )

    circles.push(circle1);
    circles.push(circle2);
    circles.push(circle3);
    circles.push(circle4)

    trailCircle=circle4;
}


function drawCircles(t){
    
    for (var i =0; i<circles.length;i++){
        let circle = circles[i];
        circle.drawCircle(t);
    }
    for (var i =0; i<circles.length;i++){
        let circle = circles[i];
        circle.drawPoint(t);
    }
}

function drawTrail(t){
    for (var i =0; i<trail.length;i++){
        let point = trail[i];
        noStroke();
        fill(color(255,255,255));
        ellipse(point.x, point.y, 4,4);
        point.x+=2;
        if(point.x>width/2){
            trail.splice(trail.indexOf(point), 1);
        }
    }

    

}

function draw() {
    //centers coordinates
    translate(width/2, height/2);



    let t = frameNumber/fps;
    frameNumber+=1;

    //resets canvas
    background(0);

    let point = trailCircle.getPoint(t);
    let trailpoint = {x:width*1/6*0, y: point.y}
    trail.push(trailpoint)
    stroke(255);
    line(point.x, point.y, trailpoint.x,trailpoint.y)
    drawCircles(t);
    drawTrail(t)
}
