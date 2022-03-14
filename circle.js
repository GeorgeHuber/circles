
class FourierCircle{
    /*
        Circle(center: {x:?, y:?}, radius=?, freq=?hz, parent=? (reference))
    
        The circle completes (hz) rotatations every second
        If attatched on the end of another circle, put the variable with the other circle in the parent reference.

        options =  {
            shift:0, //in degrees
            freq:0.5, //rotations per second
            color:color(255,255,255), //rgb values
            size: 4 //in pixels
        }


    */
    constructor(center={x:0, y:0}, radius=50, options={}, parent=null){
        
        this.freq = options.freq?options.freq:1;
        this.color = options.color?options.color:color(255, 255, 255);
        this.shift = options.shift?2*Math.PI-options.shift*2*Math.PI/360:0;
        this.size = options.size?options.size:4;

        this.radius = radius;
        this.center = center;
        this.parent = parent;
        if (parent){
            this.center = {x:0, y:0};
        }
        this.shift = 1/this.freq*this.shift;
    }

    //returns the center of the circle in the form {x:0, y:0}
    getCenter(t){
        let pointx = this.center.x;
        let pointy = this.center.y;
        if (this.parent){
            let parentPoint = this.parent.getPoint(t);
            pointx+=parentPoint.x;
            pointy+=parentPoint.y;
        }
        return {x:pointx,y:pointy}

    }

    //returns the current point of the circle being drawn in the form {x:0, y:0}
    getPoint(t){
        let pointx = this.radius * Math.cos(t*this.freq*2*Math.PI+this.shift) +this.center.x;
        let pointy = this.radius * Math.sin(t*this.freq*2*Math.PI+this.shift) +this.center.y;

        if (this.parent){
            let parentPoint = this.parent.getPoint(t);
            pointx+=parentPoint.x;
            pointy+=parentPoint.y;
        }

        return {x:pointx,y:pointy};
    }

    //draws the current point on the circle for given time
    drawPoint(t){
        let point = this.getPoint(t);
        //changes color
        noStroke();
        fill(this.color);
        ellipse(point.x, point.y, this.size*2, this.size*2);
    }

    //draws the whole circle outline
    drawCircle(t){
        let point = this.getCenter(t)
        noFill();
        stroke(this.color);
        ellipse(point.x, point.y, this.radius*2, this.radius*2);
    }

}
