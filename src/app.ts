import Ticker from './ticker.js';

export default class Catagotchi {
  private lastTickTimeStamp: number;

  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  private displayMood: HTMLDivElement;

  private displayEnergy: HTMLDivElement;

  private displayHunger: HTMLDivElement;

  private displayStatus: HTMLDivElement;

  private status: string;

  private feedButton: Element;

  private playButton: Element;

  private sleepButton: Element;

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
    this.alive = this.isAlive();

    this.status = `I'm happy <br>`;
    this.mood = 5;
    this.energy = 5;
    this.hunger = 5;

    // DOM elements
    this.gameDOM = document.querySelector('#game');

    this.displayMood = document.querySelector('#displayMood');
    this.displayEnergy = document.querySelector('#displayEnergy');
    this.displayHunger = document.querySelector('#displayHunger');
    this.displayStatus = document.querySelector('#displayStatus');
    this.displayCatDied = document.querySelector('#displayCatDied');

    // update default status of each attribute
    this.updateDisplays(this.displayEnergy, this.energy);
    this.updateDisplays(this.displayHunger, this.hunger);
    this.updateDisplays(this.displayStatus, this.status);
    this.updateDisplays(this.displayMood, this.mood);

    // buttons
    this.feedButton = document.querySelector('#buttonFeed');
    this.playButton = document.querySelector('#buttonPlay');
    this.sleepButton = document.querySelector('#buttonSleep');
    this.allButtons = document.querySelector('#buttons');

    this.feed();
    this.play();
    this.sleep();
  }

  public isAlive = (): boolean => {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.alive = false;
    } else {
      this.alive = true;
    }
    return this.alive;
  };

  private feed = (): number => {
    this.feedButton.addEventListener('click', () => {
      if (this.hunger <= 10 && this.hunger > 0) {
        this.hunger -= 1;
        this.updateDisplays(this.displayHunger, this.hunger);
      }
    });
    return this.hunger;
  };

  private sleep = (): void => {
    this.sleepButton.addEventListener('click', () => {
      if (this.energy < 10 && this.energy >= 0) {
        this.energy += 1;
        this.updateDisplays(this.displayEnergy, this.energy);
      }
      if (this.hunger < 10 && this.hunger >= 0) {
        this.hunger += 1;
        this.updateDisplays(this.displayHunger, this.hunger);
      }
    });
  };

  private play = (): void => {
    this.playButton.addEventListener('click', () => {
      if (this.mood < 10 && this.mood >= 0) {
        this.mood += 1;
        this.updateDisplays(this.displayMood, this.mood);
      }
      if (this.energy <= 10 && this.energy > 0) {
        this.energy -= 1;
        this.updateDisplays(this.displayEnergy, this.energy);
      }
    });
  };

  private meow = (): string => {
    let meow = '';
    if (this.hunger < 7 && this.mood > 3 && this.energy > 3) {
      meow = `I'm happy <br>`;
    }
    if (this.hunger >= 7) {
      meow += 'Feed me! <br>';
    }
    if (this.mood <= 3) {
      meow += 'Play with me! <br>';
    }
    if (this.energy <= 3) {
      meow += 'I need to sleep! <br>';
    }
    return meow;
  };

  private updateDisplays = (displayElement: HTMLDivElement, element: number | string): void => {
    // eslint-disable-next-line no-param-reassign
    displayElement.innerHTML = `${element}`;
  };

  /**
   * Called for every game tick. Is used in the ticker
   */
  public gameTick(): void {
    this.energy -= 1;
    this.updateDisplays(this.displayEnergy, this.energy);

    if (this.mood > 0) {
      this.mood -= 1;
      this.updateDisplays(this.displayMood, this.mood);
    }

    this.hunger += 1;
    this.updateDisplays(this.displayHunger, this.hunger);

    this.alive = this.isAlive();

    if (this.isAlive()) {
      this.updateDisplays(this.displayStatus, this.meow());
    } else {
      // console.log(`kitty alive is ${this.isAlive()}`);
      this.allButtons.classList.add('idle');
      this.displayCatDied.innerHTML = 'You killed the cat :(';
      // Request the browser to call the step method on next animation frame
    }

    // console.log(`Hunger: ${this.hunger} \n Mood: ${this.mood} \n Energy: ${this.energy} \n Alive:
    // ${this.alive}`);
  }

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000 && this.isAlive()) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    requestAnimationFrame(this.step);
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);

