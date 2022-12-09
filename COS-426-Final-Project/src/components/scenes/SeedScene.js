import * as Dat from 'dat.gui';
import { Scene, Color, MeshStandardMaterial, Mesh, PlaneGeometry, Fog } from 'three';
import { Flower, Land } from 'objects';
import { Car, Road, Lines } from 'objects';
import { BasicLights } from 'lights';

// adapted from A5 code
const buildGround = function() {
    let groundMaterial = new MeshStandardMaterial({
        color: 0x808076
    });
    // plane on the ground
    let groundGeometry = new PlaneGeometry(10000, 10000);
    let mesh = new Mesh(groundGeometry, groundMaterial);
    mesh.position.y = -1;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    return mesh
}

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        // this.background = new Color(0x7ec0ee);
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();
        const car = new Car();
        const ground = buildGround();
        const road = new Road();
        const leadingLines = new Lines([150, 125, 100, 75, 50, 25]);
        const laggingLines = new Lines([300, 275, 250, 225, 200, 175]);
        leadingLines.name = "leadingLines";
        laggingLines.name = "laggingLines";
        this.add(lights, car, ground, road, leadingLines, laggingLines);
    
        this.fog = new Fog(0x7ec0ee, 125, 150)
        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    // addToUpdateList(object) {
    //     this.state.updateList.push(object);
    // }

    // update(timeStamp) {
    //     const { rotationSpeed, updateList } = this.state;
    //     this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    //     // Call update for each object in the updateList
    //     for (const obj of updateList) {
    //         obj.update(timeStamp);
    //     }
    // }
}

export default SeedScene;
