/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock, Audio, AudioLoader, AudioListener, Box3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
const Perlin = require('./perlin.js').Perlin;

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const listener = new AudioListener(); // audio listener
camera.add(listener);
const audioLoader = new AudioLoader();


// Set up camera
camera.position.set(0, 2, -10);
camera.lookAt(new Vector3(0, 0, 0));


// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// GLOBAL VARIABLES
// source: https://jsfiddle.net/prisoner849/hg90shov/
// global clock, direction, speed
const clock = new Clock();
const direction = new Vector3(0, 0, -1);
let speed = 100; //units a second
const GRAVITY = 1500;
let freeze = false;
let playCollisionSound = true;
let segmentsZ = 200;
let segmentsX = 200;
let flying = 0;
var perlin = new Perlin();

// var perlin = new Perlin();
// var peak = 60;
// var smoothing = 300;
// function refreshVertices(terrain) {
//     var vertices = terrain.geometry.attributes.position.array;
//     for (var i = 0; i <= vertices.length; i += 3) {
//         vertices[i+2] = peak * perlin.noise(
//             (terrain.position.x + vertices[i])/smoothing, 
//             (terrain.position.z + vertices[i+1])/smoothing
//         );
//     }
//     terrain.geometry.attributes.position.needsUpdate = true;
//     terrain.geometry.computeVertexNormals();
// }

// var clockForTerrain = new Clock();
// var movementSpeed = 60;
// function update(terrain) {
//     var delta = clockForTerrain.getDelta();
//     terrain.position.z += movementSpeed * delta;
//     // camera.position.z += movementSpeed * delta;
//     refreshVertices(terrain);
// }

// source: https://jsfiddle.net/prisoner849/hg90shov/
const moveRoadLine = (speed, direction) => {
    const delta = clock.getDelta();
    const leadingLines = scene.getObjectByName('leadingLines');
    const laggingLines = scene.getObjectByName('laggingLines');
    leadingLines.position.add(direction.clone().multiplyScalar(speed * delta));
    laggingLines.position.add(direction.clone().multiplyScalar(speed * delta));
    if (leadingLines.position.z < -200) {
        leadingLines.position.z += 150;
    }
    if (laggingLines.position.z < -200) {
        laggingLines.position.z += 150;
    }
}

const updateGround = (ground, flying) => {
    // console.log('calling update ground')
    let groundGeometry = ground.geometry;
    let zOff = flying;
    // let peak = 10;
    // let smoothing = 20;
    for (let z = 0; z < segmentsZ + 1; z++) {
        let xOff = 0;
        for (let x = 0; x < segmentsX + 1; x++) {
            const index = 3 * (z * segmentsX + x);
            groundGeometry.attributes.position.array[index + 2] = (Math.min(0, perlin.noise(xOff, zOff)) * 100) - 1;
            // groundGeometry.attributes.position.array[index + 2] = Math.random() * 5 - 5;
            xOff += 0.1;
            // console.log(groundGeometry.attributes.position);
        }
        zOff += 0.1;
    }
    groundGeometry.attributes.position.needsUpdate = true;
    groundGeometry.computeVertexNormals();
}

const updateWater = (ground, flying) => {
    // console.log('calling update ground')
    let groundGeometry = ground.geometry;
    let zOff = flying;
    // let peak = 10;
    // let smoothing = 20;
    for (let z = 0; z < segmentsZ + 1; z++) {
        let xOff = 0;
        for (let x = 0; x < segmentsX + 1; x++) {
            const index = 3 * (z * segmentsX + x);
            groundGeometry.attributes.position.array[index + 2] = (Math.min(0, perlin.noise(xOff, zOff)) * 5);
            // groundGeometry.attributes.position.array[index + 2] = Math.random() * 5 - 5;
            xOff += 0.25;
            // console.log(groundGeometry.attributes.position);
        }
        zOff += 0.25;
    }
    groundGeometry.attributes.position.needsUpdate = true;
    groundGeometry.computeVertexNormals();
}

// copied from https://stackoverflow.com/questions/18921134/math-random-numbers-between-50-and-80
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// source: https://jsfiddle.net/prisoner849/hg90shov/
const moveCar = (name, direction) => {
    // const delta = clock.getDelta();

    const car = scene.getObjectByName(name);

    // console.log(delta)
    // car.position.z -= (2.8);
    // car.position.z = 0;

    car.position.add(direction.clone().multiplyScalar(1 * (speed / 175)));
    if (car.position.z < -125) {
        const zOffset = getRandomInt(250, 350);
        car.position.z += zOffset;
    }
}

// adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
const moveCarInAir = () => {
    const ambulance = scene.getObjectByName('ambulance');
    ambulance.position.y += ambulance.state.velocity_y / 500;
    // change velocity
    ambulance.state.velocity_y -= GRAVITY / 2000 * ambulance.state.accelerationFactor;
    ambulance.state.accelerationFactor *= 1.25;
    // reset if ambulance position is equal to or below ground
    if (ambulance.position.y <= -0.65) {
        ambulance.position.y = -0.65;
        // set velocity back to 0
        ambulance.state.velocity_y = 0;
        // set onGround to true
        ambulance.state.onGround = true;
        ambulance.state.accelerationFactor = 1;
    }
}

// jump: https://pixabay.com/sound-effects/cartoon-jump-6462/
// background: https://pixabay.com/music/main-title-emotional-inspiring-epic-trailer-11258/
// ambulance: https://pixabay.com/sound-effects/search/ambulance/
// collision: https://pixabay.com/sound-effects/clank-car-crash-collision-6206/ 
// whoosh: https://pixabay.com/sound-effects/whoosh-6316/
// background2: https://pixabay.com/music/synthwave-neon-gaming-128925/
// background for inserting sound: https://www.youtube.com/watch?v=91sjdKmqxdE
const sounds = {
    jump: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/jump.mp3',
    background2: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/background2.mp3',
    ambulance: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/ambulance.m4a',
    collision: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/collision.mp3',
    whoosh: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/whoosh.m4a',
}

const jumpSound = new Audio(listener);
audioLoader.load(sounds['jump'], function (buffer) {
    jumpSound.setBuffer(buffer);
    jumpSound.setLoop(false);
    jumpSound.setVolume(1);
});

const whooshSound = new Audio(listener);
audioLoader.load(sounds['whoosh'], function (buffer) {
    whooshSound.setBuffer(buffer);
    whooshSound.setLoop(false);
    whooshSound.setVolume(1);
});

const collisionSound = new Audio(listener);
audioLoader.load(sounds['collision'], function (buffer) {
    collisionSound.setBuffer(buffer);
    collisionSound.setLoop(false);
    collisionSound.setVolume(0.8);
});

const backgroundSound = new Audio(listener);
audioLoader.load(sounds['background2'], function (buffer) {
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true);
    backgroundSound.setVolume(0.4);
    backgroundSound.play()
});

const ambulanceSound = new Audio(listener);
audioLoader.load(sounds['ambulance'], function (buffer) {
    ambulanceSound.setBuffer(buffer);
    ambulanceSound.setLoop(true);
    ambulanceSound.setVolume(0.4);
    ambulanceSound.play()
});


// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    const leftGround = scene.getObjectByName('leftGround');
    const rightGround = scene.getObjectByName('rightGround');
    const water = scene.getObjectByName('water');
    if(!freeze) {
        updateGround(leftGround, flying);
        updateGround(rightGround, flying);
        updateWater(water, flying);
        flying += 0.1;
    }

    // update(scene.children[3]);
    moveRoadLine(speed, direction);
    if (!freeze) speed += 0.25; // speed gets progressively quicker
    for (let i = 1; i <= 12; i++) {
        const name = "car" + i;
        if (!freeze) moveCar(name, direction);
    }

    // console.log(scene.getObjectByName('car').position.z);
    // always move car if not onGround
    // adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
    if (!scene.getObjectByName('ambulance').state.onGround) {
        if (!freeze) moveCarInAir()
    }
    const ambulance = scene.getObjectByName('ambulance');
    for (let i = 1; i <= 18; i++) {
        let name = "car" + i;
        // console.log(name)
        let car = scene.getObjectByName(name);
        if (detectCollisions(car, ambulance)) {
            speed = 0
            freeze = true
            backgroundSound.stop();
            ambulanceSound.stop();
            if (playCollisionSound) collisionSound.play();
            playCollisionSound = false
        }
        // console.log(name + car.position.x)
    }

    renderer.render(scene, camera);

    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);


};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

const handleMoveAmbulance = (event) => {
    const ambulance = scene.getObjectByName('ambulance');
    // left arrow key
    if (event.code === "ArrowLeft" && ambulance.position.x <= 0) {
        ambulance.position.x += 2.8;
        whooshSound.play();
        console.log(scene.getObjectByName('leftGround').geometry.attributes.position)
    }
    // right arrow key
    if (event.code === "ArrowRight" && ambulance.position.x >= 0) {
        ambulance.position.x -= 2.8;
        whooshSound.play();
    }

    // space logic
    // adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
    if (event.code === "Space" && ambulance.position.y <= 1.3) {
        // increase velocity 
        ambulance.state.velocity_y = 50;
        // set onGround to false
        ambulance.state.onGround = false;
        jumpSound.play();
    }
}

const detectCollisions = (car1, car2) => {
    // const ambulance = scene.getObjectByName('ambulance');
    // var bboxAmbulance = new Box3().setFromObject(ambulance);
    const bboxCar1 = new Box3().setFromObject(car1);
    const bboxCar2 = new Box3().setFromObject(car2);
    // if car not in same lane ignore
    if (car1.position.x != car2.position.x) {
        return false;
    }
    // collision from front
    if ((bboxCar1.min.z <= bboxCar2.max.z) && (bboxCar1.min.z >= bboxCar2.min.z) && (bboxCar2.min.y <= bboxCar1.max.y)) {
        return true;
    }

    // collision from back
    if ((bboxCar1.max.z <= bboxCar2.max.z) && (bboxCar1.max.z >= bboxCar2.min.z) && (bboxCar2.min.y <= bboxCar1.max.y)) {
        return true;
    }

    // not collision otherwise
    return false;
}


windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener('keydown', handleMoveAmbulance, false);
