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
        frameWidth: 60,
        frameHeight: 84,
        startFrame: 0,
        endFrame: 15
      }
    });

  }

  create() {
    const cardWidth = 60; // Adjust the size as needed
    const cardHeight = 84;
    const gridRows = 4; // Define the number of rows and columns in the grid
    const gridCols = 13;

    const cards = []; // Array to store the card objects
    let score = 0;
    
    let activeCard = this.add.sprite(0, 0, 'cardSheet', 14);
    activeCard.value = 0;

    let isMatched = false;

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        let card = this.add.sprite(j * cardWidth, i * cardHeight, 'cardSheet', 14); // 'cardBack' is the key for the face-down card image

        // Set a custom value attribute
        card.value = j + 1;
        
        const cardValue = card.getData('value');
        cards.push(card);
      }
    }

    const cardContainer = this.add.container(50, 100, cards);
    this.add.existing(cardContainer);


    cards.forEach(card => {
      card.setInteractive();
      card.on('pointerdown', () => {
        // Set the users active card to the card they clicked
        console.log("old active card value", (activeCard.value + 1))        

        const cardValue = card.value;

        // Set the new frame of
        // the card from the sprite sheet
        card.setFrame(cardValue);

        if (isMatched == false) {
          card.setFrame(cardValue)
        } if (activeCard.value == cardValue) {
          card.setFrame(cardValue)
          score++;
        } if (activeCard.value != cardValue) {
          card.setFrame(14);
        }
        
        activeCard = card;  
        console.log("Current card is now: ", (activeCard.value + 1));
        console.log("Score is now: " + score);
      });
    });
  }
}