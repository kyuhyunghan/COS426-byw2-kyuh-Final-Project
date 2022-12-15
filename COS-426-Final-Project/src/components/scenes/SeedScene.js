import * as Dat from 'dat.gui';
import { Scene, Color, MeshStandardMaterial, Mesh, PlaneGeometry, MeshLambertMaterial, Fog, TextureLoader, font } from 'three';
import { Flower, Land } from 'objects';
import { Car, Ambulance, Road, Lines } from 'objects';
import { BasicLights } from 'lights';
const Perlin = require('../../perlin.js').Perlin;
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// adapted from A5 code
const buildGround = function (name, x, y, segmentsX, segmentsZ, color, texture_image) {
    let groundMaterial = new MeshStandardMaterial({
        color: color
        // wireframe: true
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
    mesh.position.y = y;
    mesh.position.x = x;
    mesh.rotation.x = -Math.PI / 2;
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
        if (i <= 12) return this.getRandomInt(250, 350)
        if (i <= 15) return this.getRandomInt(300, 400)
        if (i <= 18) return this.getRandomInt(350, 450)
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
        this.background = new Color(0x1E0E46);

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
        const leftGround = buildGround('leftGround', 504, -1, 200, 200, 0x6F6F6F, undefined);
        const rightGround = buildGround('rightGround', -504, -1, 200, 200, 0x6F6F6F, undefined);
        const waterTexture = 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/scenes/ocean.png'
        const water = buildGround('water', 0, -2.75, 200, 200, 0xC61A09, waterTexture);
        const terrain = buildTerrain();

        const fontLoader = new FontLoader();
        fontLoader.load(
            'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/fonts/font.json',
            (droidFont) => {
                const textGeometry = new TextGeometry('Score', {
                    size: 20,
                    height: 4,
                    font: droidFont,
                });
                const textMaterial = new MeshStandardMaterial({ color: 0xffffff });
                const textMesh = new Mesh(textGeometry, textMaterial);
                textMesh.rotation.y = -Math.PI;
                textMesh.position.x = 10;
                textMesh.position.y = 10;
                textMesh.position.z = 500;
                this.add(textMesh);
            }
        );

        const road = new Road();
        const leadingLines = new Lines("leadingLines", [150, 125, 100, 75, 50, 25]);
        const laggingLines = new Lines("laggingLines", [300, 275, 250, 225, 200, 175]);
        this.add(lights, ambulance, leftGround, rightGround, water, terrain, road, leadingLines, laggingLines);
        this.add(...cars)

        this.fog = new Fog(0x28125D, 100, 500)
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
