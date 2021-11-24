import Ticker from './ticker.js';
import Cat from './cat.js';
import KeyListener from './keyListner.js';

export default class Catagotchi {
  private cat: Cat;

  // private lastTickTimeStamp: number;

  private status: string;

  private gameDOM: Element;

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

    // DOM elements
    this.gameDOM = document.querySelector('#game');
  }

  /**
   * Called for every game tick. Is used in the ticker
   */
  public gameTick(): void {
    document.querySelector('#displayStatus').innerHTML = this.cat.meow();
    if (this.cat.isAlive()) {
      this.cat.ignore();

      this.executeUserAction();

      this.cat.updateDisplays();
    } else {
      document.querySelector('#displayCatDied').innerHTML = 'You killed the cat :(';
      this.clearScreen();
    }
  }

  private clearScreen = () => {
    console.log('clear pleaseee');
    this.cat.setMood(this.startMood);
    console.log(this.cat.getMood());
  };

  private executeUserAction = () => {
    // 70 is 'f' for feed
    if (this.cat.getIsAlive()) {
      if (this.keyListner.isKeyDown(KeyListener.KEY_F)) {
        console.log('FEEEED');
        this.cat.feed();
        this.cat.updateDisplays();
      }

      // 83 is 's' for sleep
      if (this.keyListner.isKeyDown(83)) {
        this.cat.sleep();
        console.log('SLEEP');
        this.cat.updateDisplays();
      }

      // 80 is 'p' for play
      if (this.keyListner.isKeyDown(80)) {
        this.cat.play();
        console.log('PLAYY');
        this.cat.updateDisplays();
      }
    }
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#canvas'));
};

window.addEventListener('load', init);

/**
 * versnelde ifelse
 *
 *  alive === true ? 'alive' : 'dead'
 */
