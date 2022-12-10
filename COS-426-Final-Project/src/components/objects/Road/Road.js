import { Group, Mesh, PlaneGeometry, MeshStandardMaterial, TextureLoader } from 'three';

const buildRoad = function() {
    const loader = new TextureLoader();
    let groundMaterial = new MeshStandardMaterial({
        color: 0x0f0f0f,
        map: loader.load('https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/objects/Road/textures/road_texture.jpg')
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
