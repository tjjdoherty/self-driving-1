const carCanvas = document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 1.5)
];

// ^^ this car.draw(ctx) is a duplicate that needed to be deleted out to fix the sensors being drawn.

animate();

//requestAnimationFrame calls the animate function many times per second
// gives the illusion of moment we want to see.
// every time its called, update is called (changes coordinates);
// then the car is redrawn (draw(ctx))

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
        // ^ in update method for traffic, if you pass traffic as 2nd argument, traffic will "damage" other traffic but
        // an individual traffic car will also "damage" itself
        // so just pass an empty array
        // we could put car there, so traffic is damaged by car as well as vice versa
    }
    car.update(road.borders, traffic);

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;


    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height*.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    // below - network dash lines flow upwards from input sensors to outputs, 
    // - sign is needed for that to reverse, because canvas flows down by default

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}

// moved line 17 - window.innerHeight - into animate function
// this solved the issue of previous car position remaining filled