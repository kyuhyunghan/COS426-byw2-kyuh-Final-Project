import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scene.gltf';

class Car extends Group {

    constructor(name, xCoord, zCoord) {
        // Call parent Group() constructor
        super();
        this.name = name;
        // this.offset = offset;
        // this.position.set( xCoord, -0.25, zCoord);
        // const geometry = new BoxGeometry( 1,1,1 );
        // const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        // const cube = new Mesh( geometry, material );
        // // set cube on the road
        // // cube.position.set( xCoord, -0.25, zCoord);

        // this.add(cube);

        const loader = new GLTFLoader();

        // https://sketchfab.com/3d-models/lowpoly-car-pack-94fcef58d8d04af2b6bf42f2949227eb
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(1, 1, 1);
            gltf.scene.position.x = 0;
            gltf.scene.position.y = -0.25;
            gltf.scene.position.z = 0;
            this.add(gltf.scene);
        });

    }
}

export default Car;
