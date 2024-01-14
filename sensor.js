class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 3;
        this.rayLength = 100;
        this.raySpread = Math.PI/4;
        // raySpread is based on the unit circle maths - pi is 180 deg
        // ray spread is 45 deg with 22.5 either side of straight ahead
        this.rays = [];
    }

    update() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, i/(this.rayCount-1));
            // above - lerp is being used here with 1st arg the start ray, the 2nd arg the last ray, and the 3rd arg the interval rays

            const start = {
                x: this.car.x,
                y: this.car.y
            }
            const end = {
                x: this.car.x - Math.sin(rayAngle)*this.rayLength,
                y: this.car.y - Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start, end]);
            // like with the road borders, we are using an array of objects for the rays acting as sensors for the car.
            console.log(this.rays[i][0].x, this.rays[i][0].y);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.stroke();
        }
    }
}