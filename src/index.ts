import Phaser from 'phaser';
import config from './config';
import MainMenuScene from './scenes/MainMenuScene';
import MemoryMatchingScene from './scenes/MemoryMatchingScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [MainMenuScene, MemoryMatchingScene]
  })
);
