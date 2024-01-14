const canvas = document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
// car.draw(ctx);

// ^^ this car.draw(ctx) is a duplicate that needed to be deleted out to fix the sensors being drawn.

animate();

//requestAnimationFrame calls the animate function many times per second
// gives the illusion of moment we want to see.
// every time its called, update is called (changes coordinates);
// then the car is redrawn (draw(ctx))

function animate() {
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height*.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

// moved line 17 - window.innerHeight - into animate function
// this solved the issue of previous car position remaining filled