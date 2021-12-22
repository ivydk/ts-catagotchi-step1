import Ticker from './ticker.js';
import Cat from './cat.js';
import KeyListener from './keyListner.js';
import ClockDisplay from './clockDisplay.js';
import ScoreCounter from './score.js';

console.log('hi');

export default class Catagotchi {
  private cat: Cat;

  private clockDisplay: ClockDisplay;

  private scoreCounter: ScoreCounter;

  // private lastTickTimeStamp: number;

  private status: string;

  private ticker: Ticker;

  private keyListner: KeyListener;

  private startMood: number;

  private startHunger: number;

  private startEnergy: number;

  // canvas
  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private background: HTMLImageElement;

  private timeCounting: boolean;

  private deadString: string;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas pass the canvas element where the game will run
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.background = this.loadNewImage('img/HAPPY-CAT.png');

    this.canvas.width = 600;
    this.canvas.height = 600;

    // default status
    this.timeCounting = true;
    this.deadString = '';
    this.startEnergy = 10;
    this.startMood = 10;
    this.startHunger = 0;

    this.ticker = new Ticker(this, 1000);
    this.clockDisplay = new ClockDisplay(this.writeTextToCanvas('START', 20, 55, 30, 'black', 'left'));
    this.cat = new Cat(true, this.startMood, this.startEnergy, this.startHunger);
    this.keyListner = new KeyListener();
    this.scoreCounter = new ScoreCounter();

    this.status = 'I\'m happy <br>';
  }

  /**
   * Called for every game tick. Is used in the ticker
   */
  public gameTick(): void {
    if (this.cat.isAlive()) {
      this.cat.ignore();
      this.executeUserAction();
      this.scoreCounter.setSore(5);
    } else {
      console.log('dead');
      // if the cat is dead the game stops completly, the ticker stops
      this.ticker.setIsStopped(true);
    }
    this.updateDisplays();
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize = 20,
    color = 'black',
    alignment: CanvasTextAlign = 'center',
  ): void {
    this.ctx.font = ` ${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   * @param source Path to the image file to be loaded
   * @returns An image element
   */
  // eslint-disable-next-line class-methods-use-this
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  private backgroundImage = (): HTMLImageElement => {
    if (this.cat.isAlive() === false) {
      this.background = this.loadNewImage('img/DEAD-CAT-4.png');
    } else if (this.cat.getEnergy() < 3) {
      this.background = this.loadNewImage('img/SLEEPY-CAT.png');
    } else if (this.cat.getHunger() <= 2 && this.cat.getMood() >= 8 && this.cat.getEnergy() >= 7) {
      this.background = this.loadNewImage('img/HAPPY-CAT.png');
    } else if (this.cat.getHunger() <= 4 && this.cat.getMood() >= 6 && this.cat.getEnergy() >= 5) {
      this.background = this.loadNewImage('img/NORMAL-CAT.png');
    } else if (this.cat.getHunger() > 4 && this.cat.getMood() < 6 && this.cat.getEnergy() < 5) {
      this.background = this.loadNewImage('img/GRUMPY-CAT.png');
    }
    return this.background;
  };

  public executeUserAction = (): void => {
    // 70 is 'f' for feed
    if (this.cat.getIsAlive()) {
      if (this.keyListner.isKeyDown(KeyListener.KEY_F)) {
        console.log('FEEEED');
        this.scoreCounter.setSore(20);
        this.cat.feed();
      }

      // 83 is 's' for sleep
      if (this.keyListner.isKeyDown(KeyListener.KEY_S)) {
        this.cat.sleep();
        this.scoreCounter.setSore(30);
        console.log('SLEEP');
      }

      // 80 is 'p' for play
      if (this.keyListner.isKeyDown(KeyListener.KEY_P)) {
        this.cat.play();
        this.scoreCounter.setSore(50);
        console.log('PLAYY');
      }
    }
  };

  private updateDisplays = (): void => {
    if (!this.cat.isAlive()) {
      this.timeCounting = false;
      this.deadString = 'You killed me :(';
    }

    this.clearScreen();

    this.ctx.drawImage(
      this.background,
      150,
      100,
      300,
      350,
    );

    this.writeTextToCanvas(`${this.clockDisplay.timeTick(this.timeCounting)}`, 20, 55, 30, 'black', 'left');
    this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 20, 100, 20, 'black', 'left');
    this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 20, 125, 20, 'black', 'left');
    this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 20, 150, 20, 'black', 'left');
    this.writeTextToCanvas(`Score: ${this.scoreCounter.getScore()}`, 300, 550, 40);
    this.writeTextToCanvas(`${this.deadString}`, 300, 500, 40, 'black', 'center');
    this.backgroundImage();
  };

  /**
   * Removes all painted things from the canvas.Starts at the top - left pixe
   * of the canvas and stops at the bottom - right pixel.
   */
  private clearScreen() {
    this.ctx.clearRect(8, 0, this.canvas.width, this.canvas.height);
  }
}

const init = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const catGame = new Catagotchi(document.querySelector('#canvas'));
};

window.addEventListener('load', init);
