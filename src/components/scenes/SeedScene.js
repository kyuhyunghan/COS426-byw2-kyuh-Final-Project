import { Scene, Color, MeshStandardMaterial, Mesh, PlaneGeometry, Fog, TextureLoader } from 'three';
import { Car, Ambulance, Road, Lines } from 'objects';
import { BasicLights } from 'lights';
import * as utils from "../../js/utils";

// adapted from A5 code
const buildGround = function (name, x, y, segmentsX, segmentsZ, color, texture_image) {
    let groundMaterial = new MeshStandardMaterial({
        color: color
    });
    
    // image source: https://img.besthqwallpapers.com/Uploads/19-3-2020/125338/water-background-waves-ocean-water-texture-ocean-aero-view.jpg
    if (texture_image !== undefined) {
        const loader = new TextureLoader();
        groundMaterial.map = loader.load(texture_image)
    }
    // plane on the ground
    let groundGeometry = new PlaneGeometry(1000, 1000, segmentsX, segmentsZ);

    let mesh = new Mesh(groundGeometry, groundMaterial);
    mesh.receiveShadow = true;
    mesh.name = name;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.rotation.x = -Math.PI / 2;
    return mesh
}

const buildCars = function(numCars) {
    const cars = [];
    for (let i = 1; i <= numCars; i++) {
        const xCoord = utils.chooseXCoord(i)
        const zCoord = utils.chooseInitialZ(i)
        const name = 'car' + i
        cars.push(new Car(name, xCoord, zCoord))
    }
    return cars
}

class SeedScene extends Scene {
    // state is a dictionary that contains the GUI parameters
    constructor(state) {
        
        super();

        this.state = state
        // Set background to skyColor from state
        this.background = new Color(state.skyColor);

        // Add lights to scene
        const lights = new BasicLights();

        // create ambulance and cars
        const ambulance = new Ambulance('ambulance', -0.65);
        const cars = buildCars(18);

        // create left and right ground objects
        const leftGround = buildGround('leftGround', 504, -1, 200, 200, state.blocksColor, undefined);
        const rightGround = buildGround('rightGround', -504, -1, 200, 200, state.blocksColor, undefined);
        
        // create floor 
        const floorTexture = 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/src/components/scenes/ocean.png'
        const floor = buildGround('floor', 0, -2.75, 200, 200, state.floorColor, floorTexture);

        // create road and two sets of lines (one leading and one lagging)
        const road = new Road('road');
        const leadingLines = new Lines("leadingLines", [150, 125, 100, 75, 50, 25]);
        const laggingLines = new Lines("laggingLines", [300, 275, 250, 225, 200, 175]);

        // add elements to scene object
        this.add(lights, ambulance, leftGround, rightGround, floor, road, leadingLines, laggingLines);
        this.add(...cars)

        // create fog 
        this.fog = new Fog(state.fogColor, 100, 500)
    }

    update() {
        this.background = new Color(this.state.skyColor);
        this.fog = new Fog(this.state.fogColor, 100, 500);
        this.getObjectByName('leftGround').material.color.setHex(this.state.blocksColor);
        this.getObjectByName('rightGround').material.color.setHex(this.state.blocksColor);
        this.getObjectByName('floor').material.color.setHex(this.state.floorColor);
    }
}

export default SeedScene;
