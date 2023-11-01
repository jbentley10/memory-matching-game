import Phaser from 'phaser';
import config from './config';
import MainMenuScene from './scenes/MainMenuScene';
import MemoryMatchingScene from './scenes/MemoryMatchingScene';
import './global.css';

new Phaser.Game(
  Object.assign(config, {
    scene: [MainMenuScene, MemoryMatchingScene],
    fonts: [
      { key: 'pixelFont', url: 'assets/pixelfont.ttf', fontFamily: 'PixelFont' }
    ]
  })
);
