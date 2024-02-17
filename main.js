const carCanvas = document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);

const N = 1;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
    
}

// above: use let for bestCar not const because bestCar will be constantly changing
// localStorage only works with Strings

const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -350, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -800, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -140, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -650, 30, 50, "DUMMY", 2, getRandomColor())
];

// ^^ this car.draw(ctx) is a duplicate that needed to be deleted out to fix the sensors being drawn.

animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

//requestAnimationFrame calls the animate function many times per second
// gives the illusion of moment we want to see.
// every time its called, update is called (changes coordinates) then the car is redrawn (draw(ctx))

function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
        // ^ in update method for traffic, if you pass traffic as 2nd argument, traffic will "damage" other traffic but
        // an individual traffic car will also "damage" itself
        // so just pass an empty array
        // we could put car there, so traffic is damaged by car as well as vice versa
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    
    // defined further up, with N = 100 we generate 100 cars with random input biases, and only car[0] has a sensor
    // but we don't care for car[0] in its own right, we want the car that goes the furthest
    // that is the car travelling up the canvas the most, and up on the canvas is a smaller y value
    // so bestCar is a variable that tracks the car travelling furthest up the road by the lowest y value

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

        // ^ ... spread operator because Math.min does not work with arrays, we must spread the cars array into individual values.
        // we only want the y value of the cars array to find the minimum for the bestCar constant

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;


    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height*.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    
    carCtx.globalAlpha = 0.2;

    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore();

    // below - network dash lines flow upwards from input sensors to outputs, 
    // - sign is needed for that to reverse, because canvas flows down by default

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}

// moved line 17 - window.innerHeight - into animate function
// this solved the issue of previous car position remaining filled