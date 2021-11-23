export default class Cat {
  private alive: boolean;

  public mood: number;

  public energy: number;

  public hunger: number;

  /**
   * @param alive starting bool
   * @param mood starting mood
   * @param energy starting energy
   * @param hunger starting hunger
   */
  public constructor(
    alive: boolean,
    mood: number,
    energy: number,
    hunger: number,
  ) {
    this.alive = alive;
    this.mood = mood;
    this.energy = energy;
    this.hunger = hunger;

    // !! nog doen: de buttons idle maken als de cat dood is
    // this.allButtons = document.querySelector('#buttons');

    this.feed();
    this.play();
    this.sleep();
  }

  public isAlive = (): boolean => {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.catDied();
    } else {
      this.alive = true;
    }
    return this.alive;
  };

  private feed = (): number => {
    const feedButton = document.querySelector('#buttonFeed');
    feedButton.addEventListener('click', () => {
      if (this.hunger <= 10 && this.hunger > 0) {
        this.hunger -= 1;
      }
    });
    this.updateDisplays();
    return this.hunger;
  };

  private sleep = (): number => {
    const sleepButton = document.querySelector('#buttonSleep');
    sleepButton.addEventListener('click', () => {
      if (this.energy < 10 && this.energy >= 0) {
        this.energy += 1;
      }
      if (this.hunger < 10 && this.hunger >= 0) {
        this.hunger += 1;
      }
    });
    this.updateDisplays();
    return this.energy;
  };

  private play = (): number => {
    const playButton = document.querySelector('#buttonPlay');
    playButton.addEventListener('click', () => {
      if (this.mood < 10 && this.mood >= 0) {
        this.mood += 1;
      }
      if (this.energy <= 10 && this.energy > 0) {
        this.energy -= 1;
      }
    });
    this.updateDisplays();
    return this.mood;
  };

  // !! liever in de game class
  public updateDisplays = (): void => {
    document.querySelector('#displayMood').innerHTML = `${this.mood}`;
    document.querySelector('#displayEnergy').innerHTML = `${this.energy}`;
    document.querySelector('#displayHunger').innerHTML = `${this.hunger}`;

    // !! nog even doen: status en cat died op het scherm krijgen.
    // document.querySelector('#displayStatus').innerHTML =
    // this.displayCatDied = document.querySelector('#displayCatDied');
  };

  private catDied = () => {
    this.alive = false;
  };
}
