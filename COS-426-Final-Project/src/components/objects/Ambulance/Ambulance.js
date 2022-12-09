import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

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
        const geometry = new BoxGeometry( 1.5, 1.5, 1.5 );
        const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        const cube = new Mesh( geometry, material );
        // set cube on the road
        cube.position.set( 0, -0.25, 0 );

        this.add(cube);

    }
}

export default Ambulance;
