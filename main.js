import { StartMenu } from './scenes/StartMenu.js';
import { MainLevel } from './scenes/MainLevel.js';
import { GameOver } from './scenes/GameOver.js';
import { SecondLevel } from './scenes/SecondLevel.js';

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1350,
    height: 600,
    input: {
        gamepad: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            fps: 60,
            gravity: { y: 300, x: 0 }
        }
    },
    scene: [ 
      StartMenu, GameOver, MainLevel, SecondLevel
    ]
};

let game = new Phaser.Game(config);