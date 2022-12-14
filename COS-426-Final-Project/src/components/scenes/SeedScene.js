import * as Dat from 'dat.gui';
import { Scene, Color, MeshStandardMaterial, Mesh, PlaneGeometry, PlaneBufferGeometry, MeshLambertMaterial, Fog, Vector3 } from 'three';
import { Flower, Land } from 'objects';
import { Car, Ambulance, Road, Lines } from 'objects';
import { BasicLights } from 'lights';

// adapted from A5 code
const buildGround = function () {
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

const buildTerrain = function () {
    var geometry = new PlaneGeometry(2000, 2000, 256, 256);
    var material = new MeshLambertMaterial({ color: 0x000000 });
    var terrain = new Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -5;
    return terrain;
}

class SeedScene extends Scene {

    // copied from https://stackoverflow.com/questions/18921134/math-random-numbers-between-50-and-80
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    chooseXCoord(i) {
        if (i % 3 == 1) return 2.8
        if (i % 3 == 2) return 0
        if (i % 3 == 0) return -2.8
    }

    chooseInitialZ(i) {
        if (i <= 3) return this.getRandomInt(100, 200)
        if (i <= 6) return this.getRandomInt(150, 250)
        if (i <= 9) return this.getRandomInt(200, 300)
        if (i <= 12) return this.getRandomInt(250, 300)
    }


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
        const ambulance = new Ambulance();
        ambulance.position.y = -0.65;
        const cars = [];
        for (let i = 1; i <= 12; i++) {
            const xCoord = this.chooseXCoord(i)
            const zCoord = this.chooseInitialZ(i)
            // used for ensuring that new cars are spawned correctly
            // const offset = -zCoord; 
            const name = 'car' + i
            cars.push(new Car(name, xCoord, zCoord))
        }
        const ground = buildGround();
        const terrain = buildTerrain();



        const road = new Road();
        const leadingLines = new Lines("leadingLines", [150, 125, 100, 75, 50, 25]);
        const laggingLines = new Lines("laggingLines", [300, 275, 250, 225, 200, 175]);
        this.add(lights, ambulance, ground, terrain, road, leadingLines, laggingLines);
        this.add(...cars)

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
