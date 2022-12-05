import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Car extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'car';

        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( {color: 0x0000FF} );

        const cubeA = new Mesh( geometry, material );
        cubeA.position.set( 2, 2, 2 );

        this.add(cubeA);
        console.log(window.screen.width)
        console.log(window.screen.height)

    }
}

export default Car;
