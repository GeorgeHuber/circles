convertToCentered = (point) =>{
    point.x += width/2;
    point.y += height/2;
    return point;
}

class FourierCircle{
    /*
        Circle(center: {x:?, y:?}, radius=?, freq=?hz, parent=? (reference))
    
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

    drawPoint(t){
        let point = this.getPoint(t);
        //changes color
        noStroke();
        fill(this.color);
        ellipse(point.x, point.y, this.size*2, this.size*2);
    }

    drawCircle(t){
        let point = this.getCenter(t)
        noFill();
        stroke(this.color);
        ellipse(point.x, point.y, this.radius*2, this.radius*2);
    }

}
