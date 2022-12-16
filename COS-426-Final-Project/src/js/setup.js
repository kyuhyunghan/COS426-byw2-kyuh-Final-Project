import * as Dat from 'dat.gui';
import { Audio } from 'three';


// jump: https://pixabay.com/sound-effects/cartoon-jump-6462/
// background: https://pixabay.com/music/main-title-emotional-inspiring-epic-trailer-11258/
// ambulance: https://pixabay.com/sound-effects/search/ambulance/
// collision: https://pixabay.com/sound-effects/clank-car-crash-collision-6206/ 
// whoosh: https://pixabay.com/sound-effects/whoosh-6316/
// background2: https://pixabay.com/music/synthwave-neon-gaming-128925/
// background for inserting sound: https://www.youtube.com/watch?v=91sjdKmqxdE
const sounds = {
    jump: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/jump.mp3',
    background2: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/background2.mp3',
    ambulance: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/ambulance.m4a',
    collision: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/collision.mp3',
    whoosh: 'https://raw.githubusercontent.com/kyuhyunghan/COS426-byw2-kyuh-Final-Project/main/COS-426-Final-Project/src/components/sounds/whoosh.m4a',
}

export function createGUIState() {
    // Init state
    const state = {
        gui: new Dat.GUI(), // Create GUI for scene
        difficulty: 'Medium',
        skyColor: 0x1E0E46,
        fogColor: 0x28125D,
        floorColor: 0xC61A09,
        blocksColor: 0x6F6F6F,
        accelerationRate: 1.2
    };
    let gamePlay = state.gui.addFolder('Gameplay');
    gamePlay.add(state, 'difficulty', [ 'Easy', 'Medium', 'Hard' ]);
    gamePlay.add(state, 'accelerationRate', 1.15, 1.25, 0.01);
    let colorSettings = state.gui.addFolder('Color');
    colorSettings.addColor(state, 'skyColor')
    colorSettings.addColor(state, 'fogColor')
    colorSettings.addColor(state, 'floorColor')
    colorSettings.addColor(state, 'blocksColor')
    return state
}

export function createSounds(listener, audioLoader) {
    const jumpSound = new Audio(listener);
    audioLoader.load(sounds['jump'], function (buffer) {
        jumpSound.setBuffer(buffer);
        jumpSound.setLoop(false);
        jumpSound.setVolume(1);
    });

    const whooshSound = new Audio(listener);
    audioLoader.load(sounds['whoosh'], function (buffer) {
        whooshSound.setBuffer(buffer);
        whooshSound.setLoop(false);
        whooshSound.setVolume(1);
    });

    const collisionSound = new Audio(listener);
    audioLoader.load(sounds['collision'], function (buffer) {
        collisionSound.setBuffer(buffer);
        collisionSound.setLoop(false);
        collisionSound.setVolume(0.8);
    });

    const backgroundSound = new Audio(listener);
    audioLoader.load(sounds['background2'], function (buffer) {
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);
        backgroundSound.setVolume(0.4);
        backgroundSound.play()
    });

    const ambulanceSound = new Audio(listener);
    audioLoader.load(sounds['ambulance'], function (buffer) {
        ambulanceSound.setBuffer(buffer);
        ambulanceSound.setLoop(true);
        ambulanceSound.setVolume(0.4);
        ambulanceSound.play()
    });

    return [jumpSound, whooshSound, collisionSound, backgroundSound, ambulanceSound]
}