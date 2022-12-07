import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Car extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'car';
        // cannot find source?
        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        const cube = new Mesh( geometry, material );
        cube.position.set( 0, 0, 0 );

        this.add(cube);

    }
}

export default Car;
