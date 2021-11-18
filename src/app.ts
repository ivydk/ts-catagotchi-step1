class Catagotchi {
  private lastTickTimeStamp: number;

  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  private gameDOM: Element;

  private displayMood: HTMLDivElement;

  private displayEnergy: HTMLDivElement;

  private displayHunger: HTMLDivElement;

  private displayStatus: HTMLDivElement;

  private status: string;

  private feedButton: Element;

  private playButton: Element;

  private sleepButton: Element;

  private allButtons: HTMLDetailsElement;

  private intervalTime: number;

  private displayCatDied: HTMLDivElement;

  private element: HTMLDivElement;

  private width: number;

  // private intervalTimer;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  constructor(gameDOM: Element) {
    this.startRunning();

    // default status
    this.alive = this.isAlive();

    this.status = 'feed me';
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

  isAlive = () => {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.alive = false;
    } else {
      this.alive = true;
    }
    return this.alive;
  };

  feed = () => {
    this.feedButton.addEventListener('click', () => {
      if (this.hunger <= 10 && this.hunger > 0) {
        this.hunger -= 1;
        this.updateDisplays(this.displayHunger, this.hunger);
      }
    });
    return this.hunger;
  };

  sleep = () => {
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

  play = () => {
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

  meow = () => {
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

  catDied = () => {
    this.allButtons.classList.add('idle');
  };

  getDOMElements = () => {

  };

  updateDisplays = (displayElement: HTMLDivElement, element: number | string) => {
    // const str = new String(element);
    displayElement.innerHTML = `${element}`;
  };

  /**
   * Called for every game tick.
   */
  public gameTick() {
    this.energy -= 1;
    this.updateDisplays(this.displayEnergy, this.energy);

    this.mood -= 1;
    this.updateDisplays(this.displayMood, this.mood);

    this.hunger += 1;
    this.updateDisplays(this.displayHunger, this.hunger);

    this.alive = this.isAlive();

    console.log(`Hunger: ${this.hunger} \n Mood: ${this.mood} \n Energy: ${this.energy} \n Alive: ${this.alive}`);
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
   * @returns null to stop the function
   */
  private step = (timestamp: number): boolean => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000 && this.isAlive()) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    if (this.isAlive()) {
      this.updateDisplays(this.displayStatus, this.meow());
    } else {
      console.log(`kitty alive is ${this.isAlive()}`);
      this.allButtons.classList.add('idle');
      this.displayCatDied.innerHTML = 'You killed the cat :(';
      return null;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
    return null;
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
