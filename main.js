const canvas = document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

//requestAnimationFrame calls the animate function many times per second
// gives the illusion of moment we want to see.
// every time its called, update is called (changes coordinates);
// then the car is redrawn (draw(ctx))

function animate() {
    car.update();
    canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}

// moved line 17 - window.innerHeight - into animate function
// this solved the issue of previous car position remaining filled