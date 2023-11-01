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
    let lastClickedCard = null; // Keep track of the card last clicked by the player   

    function flipCard (card) {
      if (!card.getData('flipped')) {
        console.log("Card not flipped yet");
        card.setFrame(card.value);
        card.flipped = true; 
    
        if (lastClickedCard) { 
          // If a card was previously clicked
          const lastValue = lastClickedCard.value;
          const currentValue = card.value;
    
          if (lastValue === currentValue) {
            // The cards match, keep them face-up
            // Add animations
            score++;
          } else {
            // Cards do not match
            const lastCard = lastClickedCard;

            setTimeout(() => {
              card.setFrame(14);
              card.setData('flipped', false);
              lastCard.setFrame(14);
              lastCard.flipped = false;
            }, 1000);
          }
    
          lastClickedCard = null; // Reset last clicked card
        } else {
          lastClickedCard = card; // Set the last clicked card to current card
        }
      }
    }

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        let card = this.add.sprite(j * cardWidth, i * cardHeight, 'cardSheet', 14); // 'cardBack' is the key for the face-down card image

        // Set a custom value attribute
        card.value = j + 1;
        card.flipped = false;
        
        cards.push(card);
      }
    }

    const cardContainer = this.add.container(50, 100, cards);
    this.add.existing(cardContainer);


    cards.forEach(card => {
      card.setInteractive();
      card.on('pointerdown', () => {
        // Set the users active card to the card they clicked
        flipCard(card);
      });
    });
  }
}