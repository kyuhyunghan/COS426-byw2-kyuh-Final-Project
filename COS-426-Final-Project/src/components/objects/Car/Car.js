import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Car extends Group {

    constructor(name, xCoord, zCoord) {
        // Call parent Group() constructor
        super();
        this.name = name;
        // this.offset = offset;
        this.position.set( xCoord, -0.25, zCoord);
        const geometry = new BoxGeometry( 1,1,1 );
        const material = new MeshBasicMaterial( {color: 0xf0f0f0} );

        const cube = new Mesh( geometry, material );
        // set cube on the road
        // cube.position.set( xCoord, -0.25, zCoord);

        this.add(cube);

    }
}

export default Car;
