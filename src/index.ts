import Phaser from 'phaser';
import config from './config';
import MemoryMatchingScene from './scenes/MemoryMatchingScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [MemoryMatchingScene]
  })
);
