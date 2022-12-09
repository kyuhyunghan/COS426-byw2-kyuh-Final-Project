import { Group, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';

const buildRoadLines = function(z) {
    const zCoords = z;
    const xCoords = [-1.5, 1.5];
    let meshes = []
    for(let i = 0; i < xCoords.length; i++){
        for(let j = 0; j < zCoords.length; j++){
            let groundMaterial = new MeshStandardMaterial({
                color: 0xffffff
            });
            // road on the ground
            let groundGeometry = new PlaneGeometry(0.25, 10);
            let mesh = new Mesh(groundGeometry, groundMaterial);
            mesh.position.y = -0.98;
            mesh.position.z = zCoords[j];
            mesh.position.x = xCoords[i];
            mesh.rotation.x = -Math.PI / 2;
            mesh.receiveShadow = true;
            meshes.push(mesh)
        }
    }
    return meshes
}

class Lines extends Group {
    constructor(zCoords) {
        // Call parent Group() constructor
        super();
        
        const roadLines = buildRoadLines(zCoords);
        const group = new Group();
        group.add(...roadLines);
        return group
    }
}

export default Lines;
