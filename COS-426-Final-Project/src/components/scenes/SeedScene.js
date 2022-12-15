import { Scene, Color, MeshStandardMaterial, Mesh, PlaneGeometry, MeshLambertMaterial, Fog, TextureLoader } from 'three';
import { Flower, Land } from 'objects';
import { Car, Ambulance, Road, Lines } from 'objects';
import { BasicLights } from 'lights';
const Perlin = require('../../perlin.js').Perlin;

// adapted from A5 code
const buildGround = function (name, x, y, segmentsX, segmentsZ, color, texture_image) {
    let groundMaterial = new MeshStandardMaterial({
        color: color
    });
    
    // image source: https://img.besthqwallpapers.com/Uploads/19-3-2020/125338/water-background-waves-ocean-water-texture-ocean-aero-view.jpg
    if(texture_image !== undefined){
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
        if (i <= 12) return this.getRandomInt(250, 350)
        if (i <= 15) return this.getRandomInt(300, 400)
        if (i <= 18) return this.getRandomInt(350, 450)
    }


    constructor(state) {
        
        // Call parent Scene() constructor
        super();
        this.state = state
        // Set background to a nice color
        this.background = new Color(state.skyColor);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        const lights = new BasicLights();
        const ambulance = new Ambulance();
        ambulance.position.y = -0.65;
        const cars = [];
        for (let i = 1; i <= 18; i++) {
            const xCoord = this.chooseXCoord(i)
            const zCoord = this.chooseInitialZ(i)
            // used for ensuring that new cars are spawned correctly
            // const offset = -zCoord; 
            const name = 'car' + i
            cars.push(new Car(name, xCoord, zCoord))
        }
        const leftGround = buildGround('leftGround', 504, -1, 200, 200, state.blocksColor, undefined);
        const rightGround = buildGround('rightGround', -504, -1, 200, 200, state.blocksColor, undefined);
        const floorTexture = 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/scenes/ocean.png'
        const floor = buildGround('floor', 0, -2.75, 200, 200, state.floorColor, floorTexture);
        // const terrain = buildTerrain();



        const road = new Road();
        const leadingLines = new Lines("leadingLines", [150, 125, 100, 75, 50, 25]);
        const laggingLines = new Lines("laggingLines", [300, 275, 250, 225, 200, 175]);
        this.add(lights, ambulance, leftGround, rightGround, floor, road, leadingLines, laggingLines);
        this.add(...cars)

        this.fog = new Fog(state.fogColor, 100, 500)
    }

    // addToUpdateList(object) {
    //     this.state.updateList.push(object);
    // }

    update() {
        this.background = new Color(this.state.skyColor);
        this.fog = new Fog(this.state.fogColor, 100, 500);
        this.getObjectByName('leftGround').material.color.setHex(this.state.blocksColor);
        this.getObjectByName('rightGround').material.color.setHex(this.state.blocksColor);
        this.getObjectByName('floor').material.color.setHex(this.state.floorColor);
    }
}

export default SeedScene;
