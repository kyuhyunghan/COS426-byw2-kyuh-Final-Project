import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scene.gltf';

class Ambulance extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'ambulance';
        // Jumping logic (acceleration factor) background taken from
        // https://discourse.threejs.org/t/three-js-simple-jump/40411
        this.state = {
            onGround: true,
            velocity_y: 0,
            accelerationFactor: 1
        }

        const loader = new GLTFLoader();

        // Adapted from: https://github.com/harveyw24/Glider
        this.name = 'ambulance';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(0.008, 0.008, 0.008);
            // gltf.scene.children[0].position.set(0, -0.25, 0);
            this.add(gltf.scene);
        });
    }
}

export default Ambulance;
