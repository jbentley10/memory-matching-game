/**
 * @file MemoryMatchingScene.ts
 */
import Phaser from 'phaser';

export default class MemoryMatchingScene extends Phaser.Scene {  
  constructor() {
    super('MemoryMatchingScene');
  }

  preload() {
    // Load the spritesheet for the cards
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

    // Load the game background and restart button
    this.load.image('gameBackground', 'assets/background.png');
    this.load.image('restartButton', 'assets/restart-button.png');
  }

  create() {
    /**
     * Initial setup
     */
    // Setting up the cards and grid
    const cardWidth = 65;
    const cardHeight = 90;
    const gridRows = 3;
    const gridCols = 6;
    const cards = []; // Array to store the card objects 
    
    // Scoring and tracking player interaction
    let score = 0;  
    let scoreText;      
    let lastClickedCard = null; // Keep track of the card last clicked by the player   
    let isMatching = false; // Helps prevent further input until the match is over

    // Add the background and score text
    this.add.image(400, 300, 'gameBackground').setDisplaySize(800, 600);
    scoreText = this.add.text(75, 60, 'Score: 0', { fontFamily: 'PixelFont', fontSize: '32px', fill: '#000' });

    // Add a restart button here
    const restartButton = this.add.image(700, 60, 'restartButton').setScale(0.5);
    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
      this.scene.restart();
    });

    /**
     * Card interaction setup
     */
    
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        let card = this.add.sprite(j * cardWidth, i * cardHeight, 'cardSheet', 14); // 'cardBack' is the key for the face-down card image

        // Set a custom value attribute
        card.value = Phaser.Math.Between(0, 13);
        card.flipped = false;
        
        cards.push(card);
      }
    }

    const cardContainer = this.add.container(250, 200, cards);
    this.add.existing(cardContainer);


    cards.forEach(card => {
      card.setInteractive();
      card.on('pointerdown', () => {
        // Only flip the card if it is not already flipped, not currently matching, and not the same as lastClickedCard
        if (card !== lastClickedCard) {
          flipCard(card);
        }
      });
    });

    /**
     * Helper functions
     */
    function updateScoreDisplay() {
      // Update the score display on your game UI
      // For example, if you have an HTML element with an id "scoreDisplay":
      scoreText.setText(`Score: ${score}`);
    }

    function flipCard (card) {
      if (!card.getData('flipped') && !isMatching) {
        card.setFrame(card.value);
        card.flipped = true; 
    
        if (lastClickedCard) { 
          // If a card was previously clicked
          const lastValue = lastClickedCard.value;
          const currentValue = card.value;
    
          if (lastClickedCard !== card && lastValue === currentValue) {
            // The cards match, keep them face-up
            // Add animations
            score++;
            updateScoreDisplay();
          } else {
            // Cards do not match
            const lastCard = lastClickedCard;
            isMatching = true; // Set flag to true while matching is in progress

            setTimeout(() => {
              card.setFrame(14);
              card.setData('flipped', false);
              lastCard.setFrame(14);
              lastCard.flipped = false;
              isMatching = false; // Reset flag after matching is complete
            }, 1000);
          }
    
          lastClickedCard = null; // Reset last clicked card
        } else {
          lastClickedCard = card; // Set the last clicked card to current card
        }
      }
      console.log(card.value);
    }
  }
}