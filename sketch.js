let circles = []; //the array of circles being drawn
let fps = 60; //frames per second
let frameNumber = 0; //do not change, tracks elapsed time
let trail = []; //the wavy thing being drawn off to the side

// defines the size of the canvas
let width = 1200;
let height = 800;

//the circle which defines the graph. typically the outermost ones
let trailCircle;



function setup() {
    //creates canvas
    createCanvas(width, height);
    frameRate(fps)

    //sets background color
    background(color(0,0,0));


    //delete these circles and put your code below ->


    //code to define a circle
    let circle1 = new FourierCircle(
            {x:-height/2,y:0}, //center of the circle
            200, //radius
            {
                freq:.2,
                shift:180,
                color: color(200,200,255),
                size: 10
            },
            null //parent reference
        )

    //makes more circles
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

    //adds them to the list of things being drawn
    circles.push(circle1);
    circles.push(circle2);
    circles.push(circle3);

    //graphs based on last circle
    trailCircle=circle3;
}

//a function to draw all of the circles in the list
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

//draws the graph
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

//
function draw() {
    //centers coordinates and keeps time. Probably don't change this.
    translate(width/2, height/2);

    let t = frameNumber/fps;
    frameNumber+=1;

    //resets canvas
    background(color(0,0,0));

    //adds current point to the graph
    let point = trailCircle.getPoint(t);
    let trailpoint = {x:width*1/6*0, y: point.y}
    trail.push(trailpoint)


    //display line to graph from outer circle
    stroke(255);
    line(point.x, point.y, trailpoint.x,trailpoint.y)

    drawCircles(t);
    drawTrail(t)
}
