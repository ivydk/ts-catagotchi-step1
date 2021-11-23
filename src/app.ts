import Ticker from './ticker.js';
import Cat from './cat.js';

export default class Catagotchi {
  private cat: Cat;

  // private lastTickTimeStamp: number;

  private status: string;

  private allButtons: HTMLDetailsElement;

  private displayCatDied: HTMLDivElement;

  private gameDOM: Element;

  private ticker: Ticker;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  public constructor(gameDOM: Element) {
    // default status
    this.ticker = new Ticker(this, 3000);
    this.cat = new Cat(true, 5, 6, 4);

    this.status = 'I\'m happy <br>';

    // DOM elements
    this.gameDOM = document.querySelector('#game');
  }

  /**
   * Called for every game tick. Is used in the ticker
   */
  public gameTick(): void {
    if (this.cat.energy > 0 && this.cat.hunger > 0) {
      this.cat.energy -= 1;

      if (this.cat.mood > 0) {
        this.cat.mood -= 1;
      }

      this.cat.hunger += 1;
    } else {
      // console.log(`kitty alive is ${this.isAlive()}`);
      this.allButtons.classList.add('idle');
      this.displayCatDied.innerHTML = 'You killed the cat :(';
      // Request the browser to call the step method on next animation frame
    }

    // console.log(`Hunger: ${this.hunger} \n Mood: ${this.mood} \n Energy: ${this.energy} \n Alive:
    // ${this.alive}`);
  }

  private meow = (): string => {
    let meow = '';
    if (this.cat.hunger < 7 && this.cat.mood > 3 && this.cat.energy > 3) {
      meow = `I'm happy <br>`;
    }
    if (this.cat.hunger >= 7) {
      meow += 'Feed me! <br>';
    }
    if (this.cat.mood <= 3) {
      meow += 'Play with me! <br>';
    }
    if (this.cat.energy <= 3) {
      meow += 'I need to sleep! <br>';
    }
    return meow;
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);


/**
 * versnelde ifelse
 *
 *  alive === true ? 'alive' : 'dead'
 */
