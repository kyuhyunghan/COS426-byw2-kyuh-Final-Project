/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

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

const moveCarInAir = () => {
    // const delta = clock.getDelta();
    const ambulance = scene.getObjectByName('ambulance');
    // const delta = clock.getDelta();
    ambulance.position.y += ambulance.state.velocity_y / 500;
    // change velocity
    ambulance.state.velocity_y -= GRAVITY / 2000 * ambulance.state.accelerationFactor;
    ambulance.state.accelerationFactor *= 1.05
    if(ambulance.state.velocity_y <= 0) {
        ambulance.state.accelerationFactor *= 1
    }
    // reset if ambulance position is equal to or below ground
    if(ambulance.position.y <= 0){
        ambulance.position.set( 0, 0, 0 );
        // set velocity back to 0
        ambulance.state.velocity_y = 0;
        // set onGround to true
        ambulance.state.onGround = true;
        ambulance.state.accelerationFactor = 1;
    }
}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();

    moveRoadLine(speed, direction);
    // always move car if not onGround
    if(!scene.getObjectByName('ambulance').state.onGround){
        console.log(scene.getObjectByName('ambulance').position.y)
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

const handleMoveCar = (event) => {
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
    if(event.code === "Space") {
        // increase velocity 
        ambulance.state.velocity_y = 50;
        // set onGround to false
        ambulance.state.onGround = false;
    }
}

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener('keydown', handleMoveCar, false);
