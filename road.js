class Road {
    constructor(x,width,laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        // define infinity - there is one built in to JavaScript 
        // but this const stops performance issues
        const infinity = 10000000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i=0; i<=this.laneCount;i++) {
            const x=lerp(this.left, this.right, i/this.laneCount);

            ctx.beginPath();
            ctx.moveTo(x, this.top)
            ctx.lineTo(x, this.bottom);
            ctx.stroke();

        }
    }
}

function lerp(A,B,t) {
    // t is a percentage between the start point A and endpoint B
    // if t = 0; evaluates to A - first lane marking
    // if t = 1, evaluates to B - last lane marking
    // anything in between is your extra markings for multiple lanes
    return (A+(B-A)*t);
}

