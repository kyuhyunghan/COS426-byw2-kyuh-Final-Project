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
const direction = new Vector3(0, 0, 1);
const speed = 1; //units a second

// source: https://jsfiddle.net/prisoner849/hg90shov/
const moveRoad = (speed, direction) => {   
    const delta = clock.getDelta();
    scene.children[3].position.add(direction.clone().multiplyScalar(speed * delta));
}


// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();

    moveRoad(speed, direction);

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
    // left arrow key
    if (event.code === "ArrowLeft") {
        scene.children[1].position.x += 1.8;
    }
    // right arrow key
    if (event.code === "ArrowRight") {
        scene.children[1].position.x -= 1.8;
    }
}

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener('keydown', handleMoveCar, false);
