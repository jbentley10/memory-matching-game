// Define a new Phaser Scene for the main menu
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainMenuScene' });
    }

		preload() {
			this.load.image('mainMenu', 'assets/main-menu.png');
			this.load.image('startButton', 'assets/start-button.png')
		}

    create() {
      // Add a background image
      this.add.image(400, 300, 'mainMenu').setDisplaySize(800, 600);
  
      // Create a "Start" button
      this.add.image(400, 350, 'startButton')
				.setDisplaySize(140, 50)
				.setInteractive()
        .on('pointerdown', () => {
          this.scene.start('MemoryMatchingScene'); // Start the game scene when clicked
        });
    }
  }
  