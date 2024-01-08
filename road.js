class Road {
    constructor(x,width,laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        // define infinity - there is one built in to JavaScript 
        // but this const stops performance issues
        const infinity = 10000000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            // linear interpolation - go from left to right according to a %
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}

