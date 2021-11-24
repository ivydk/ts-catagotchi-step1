import Ticker from './ticker.js';
import Cat from './cat.js';
import KeyListener from './keyListner.js';

export default class Catagotchi {
  private cat: Cat;

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

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // default status
    this.startEnergy = 10;
    this.startMood = 10;
    this.startHunger = 0;

    this.ticker = new Ticker(this, 1000);
    this.cat = new Cat(true, this.startMood, this.startEnergy, this.startHunger);
    this.keyListner = new KeyListener();

    this.status = 'I\'m happy <br>';
  }

  /**
   * Called for every game tick. Is used in the ticker
   */
  public gameTick(): void {
    if (this.cat.isAlive()) {
      this.cat.ignore();

      this.executeUserAction();

      this.updateDisplays();
    }
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
    color = 'red',
    alignment: CanvasTextAlign = 'center',
  ) {
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

  private executeUserAction = () => {
    // 70 is 'f' for feed
    if (this.cat.getIsAlive()) {
      if (this.keyListner.isKeyDown(KeyListener.KEY_F)) {
        console.log('FEEEED');
        this.cat.feed();
      }

      // 83 is 's' for sleep
      if (this.keyListner.isKeyDown(83)) {
        this.cat.sleep();
        console.log('SLEEP');
      }

      // 80 is 'p' for play
      if (this.keyListner.isKeyDown(80)) {
        this.cat.play();
        console.log('PLAYY');
      }
    }
  };

  private updateDisplays = (): void => {
    this.writeTextToCanvas('hello', 200, 200);
  };
}

const init = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const catGame = new Catagotchi(document.querySelector('#canvas'));
};

window.addEventListener('load', init);

/**
 * versnelde ifelse
 *
 *  alive === true ? 'alive' : 'dead'
 */
