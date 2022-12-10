/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock, Audio, AudioLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const listener = new AudioListener(); // audio listener
camera.add( listener );
const audioLoader = new AudioLoader();


// Set up camera
camera.position.set(0, 2, -10);
camera.lookAt(new Vector3(0, 0, 0));

// https://pixabay.com/sound-effects/cartoon-jump-6462/

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

// source: https://jsfiddle.net/prisoner849/hg90shov/
// global clock, direction, speed
const clock = new Clock();
const direction = new Vector3(0, 0, -1);
const speed = 175; //units a second
const GRAVITY = 1500;

// source: https://jsfiddle.net/prisoner849/hg90shov/
const moveRoadLine = (speed, direction) => {   
    const delta = clock.getDelta();
    const leadingLines = scene.getObjectByName('leadingLines');
    const laggingLines = scene.getObjectByName('laggingLines');
    leadingLines.position.add(direction.clone().multiplyScalar(speed * delta));
    laggingLines.position.add(direction.clone().multiplyScalar(speed * delta));
    if(leadingLines.position.z < -200) {
        leadingLines.position.z += 150;
    }
    if(laggingLines.position.z < -200) {
        laggingLines.position.z += 150;
    }
}

// source: https://jsfiddle.net/prisoner849/hg90shov/
const moveCar = (speed, direction) => {   
    const delta = clock.getDelta();
    
    const car = scene.getObjectByName('car');

    // console.log(delta)
    // car.position.z -= (2.8);
    // car.position.z = 0;

    car.position.add(direction.clone().multiplyScalar(1));
    if(car.position.z < -140) {
        car.position.z += 150;
    }
}

// adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
const moveCarInAir = () => {
    const ambulance = scene.getObjectByName('ambulance');
    ambulance.position.y += ambulance.state.velocity_y / 500;
    // change velocity
    ambulance.state.velocity_y -= GRAVITY / 2000 * ambulance.state.accelerationFactor;
    ambulance.state.accelerationFactor *= 1.1;
    // reset if ambulance position is equal to or below ground
    if(ambulance.position.y <= 0){
        ambulance.position.y = 0;
        // set velocity back to 0
        ambulance.state.velocity_y = 0;
        // set onGround to true
        ambulance.state.onGround = true;
        ambulance.state.accelerationFactor = 1;
    }
}

const jumpSound = new Audio(listener);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();

    moveRoadLine(speed, direction);
    moveCar(speed, direction);

    // console.log(scene.getObjectByName('car').position.z);
    // always move car if not onGround
    // adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
    if(!scene.getObjectByName('ambulance').state.onGround){
        moveCarInAir()
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
    }
    // right arrow key
    if (event.code === "ArrowRight" && ambulance.position.x >= 0) {
        ambulance.position.x -= 2.8;
    }

    // space logic
    // adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
    if(event.code === "Space" && ambulance.position.y <= 2) {
        // increase velocity 
        ambulance.state.velocity_y = 50;
        // set onGround to false
        ambulance.state.onGround = false;
    }
}

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener('keydown', handleMoveAmbulance, false);
