import { Group, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';

const buildRoad = function() {
    let groundMaterial = new MeshStandardMaterial({
        color: 0x0f0f0f
    });
    // road on the ground
    let groundGeometry = new PlaneGeometry(10, 10000);
    let mesh = new Mesh(groundGeometry, groundMaterial);
    mesh.position.y = -0.99;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    return mesh
}

class Road extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'road';
        
        const road = buildRoad();

        this.add(road);
    }
}

export default Road;
