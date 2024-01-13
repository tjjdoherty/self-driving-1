class Road {
    constructor(x,width,laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        // define infinity - there is one built in to JavaScript 
        // but this const stops performance issues
        // ISSUE WAS INFINITY HAD TOO MANY ZEROS - FLOATING POINT IMPRECISION? The Dashed Lines weren't working if I added two more 0s than are there now. WTF????
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i=0; i<=this.laneCount;i++) {
            const x=lerp(this.left, this.right, i/this.laneCount);

            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]);
            } else {
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(x, this.top)
            ctx.lineTo(x, this.bottom);
            ctx.stroke();

        }
    }
}

