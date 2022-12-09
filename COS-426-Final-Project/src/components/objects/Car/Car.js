import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Car extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'ambulance';

        this.state = {
            onGround: true,
            velocity_y: 0,
            accelerationFactor: 1
        }
        
        const geometry = new BoxGeometry( 1.5, 1.5, 1.5 );
        const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        const cube = new Mesh( geometry, material );
        // set cube on the road
        cube.position.set( 2.8, -0.25, 50 );

        this.add(cube);

    }
}

export default Car;
