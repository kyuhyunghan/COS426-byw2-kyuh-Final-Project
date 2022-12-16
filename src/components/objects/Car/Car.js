// File for the Car Object

import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scene.gltf';

class Car extends Group {

    constructor(name, xCoord, zCoord) {
        super();
        this.name = name;
        const loader = new GLTFLoader();

        // Car Model taken from: https://sketchfab.com/3d-models/lowpoly-car-pack-94fcef58d8d04af2b6bf42f2949227eb
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(0.7, 0.7, 0.7);
            this.position.y = -0.5;
            // sets the x and z position of the car
            this.position.x = xCoord;
            this.position.z = zCoord;
            this.add(gltf.scene);
        });

    }
}

export default Car;
