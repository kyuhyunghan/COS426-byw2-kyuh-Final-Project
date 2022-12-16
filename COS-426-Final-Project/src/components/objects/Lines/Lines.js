// File for the Line Object

import { Group, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';

// returns a list of road line meshes
const buildRoadLines = function(z) {
    const zCoords = z;
    const xCoords = [-1.5, 1.5];
    let meshes = []
    // creates 2 * len(zCoords) lines based on the x and z positions
    for(let i = 0; i < xCoords.length; i++){
        for(let j = 0; j < zCoords.length; j++){
            let groundMaterial = new MeshStandardMaterial({
                color: 0xffffff
            });
            let groundGeometry = new PlaneGeometry(0.25, 10);
            let mesh = new Mesh(groundGeometry, groundMaterial);
            mesh.position.y = -0.98;
            // sets the x and z positions respectively
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
    constructor(name, zCoords) {
        super();
        // creates road lines
        const roadLines = buildRoadLines(zCoords);
        const group = new Group();
        // unpacks all road line meshes and adds to a group
        group.add(...roadLines);
        group.name = name;
        return group
    }
}

export default Lines;
