import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Car extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'car';
        
        const geometry = new BoxGeometry( 1.5, 1.5, 1.5 );
        const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        const cube = new Mesh( geometry, material );
        // set cube on the road
        cube.position.set( 0, -0.25, 0 );

        this.add(cube);

    }
}

export default Car;
