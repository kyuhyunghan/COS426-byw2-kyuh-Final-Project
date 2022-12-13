import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scene.gltf';

class Ambulance extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'ambulance';
        // adapted from https://discourse.threejs.org/t/three-js-simple-jump/40411
        this.state = {
            onGround: true,
            velocity_y: 0,
            accelerationFactor: 1
        }

        const loader = new GLTFLoader();

        // https://github.com/harveyw24/Glider
        // 
        this.name = 'ambulance';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(0.008, 0.008, 0.008);
            // gltf.scene.children[0].position.set(0, -0.25, 0);
            this.add(gltf.scene);
        });

        // const geometry = new BoxGeometry( 1.5, 1.5, 1.5 );
        // const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        // const cube = new Mesh( geometry, material );
        // // set cube on the road
        // cube.position.set( 0, -0.25, 0 );

        // this.add(cube);

    }
}

export default Ambulance;
