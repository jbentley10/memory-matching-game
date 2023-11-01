/**
 * @file MemoryMatchingScene.ts
 */
import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('MemoryMatchingScene');
  }

  preload() {
    // this.load.image('cardBack', 'assets/cardBack.png');
    this.load.spritesheet({
      key: 'cardSheet',
      url: 'assets/card-sheet.png',
      frameConfig: {
          frameWidth: 25,
          frameHeight: 34,
          startFrame: 0,
          endFrame: 15
      }
    });

  }

  create() {
    const cardWidth = 35; // Adjust the size as needed
    const cardHeight = 40;
    const gridRows = 4; // Define the number of rows and columns in the grid
    const gridCols = 13;

    const cards = []; // Array to store the card objects

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        let card = this.add.sprite(j * cardWidth, i * cardHeight, 'cardSheet', j); // 'cardBack' is the key for the face-down card image
        card.name = `Card ${j + 1}`;

        // Set the face cards to the right name        
        switch (card.name) {
          case "Card 1":
            // Set to Ace
            card.name = "Card Ace";
            break;
          case "Card 11":
            card.name = "Card Jack"
            break;
          case "Card 12":
            card.name = "Card Queen"
            break;
          case "Card 13":
            card.name = "Card King"
            break;
          default:
            break;
        }

        cards.push(card);
      }
    }

    cards.forEach(card => {
      card.setInteractive();
      card.on('pointerdown', () => {
        // Card interaction logic
        console.log(card.name);
      });
    });
    

    const cardContainer = this.add.container(200, 100, cards);

    this.add.existing(cardContainer);
  }
}