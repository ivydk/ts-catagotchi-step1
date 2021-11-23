/**
 * je wilt de properties niet op public hebben omdat mensen deze dan kunnen aanpassen,
 * daarom geruik je getter en setter, methodes die de waardes teruggeven
 *
 * bijv.  getEnergy(){
 *          return this.energy;
 *        }
 */

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
    this.updateDisplays();

    // !! nog doen: de buttons idle maken als de cat dood is
    // this.allButtons = document.querySelector('#buttons');

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
    const feedButton = document.querySelector('#buttonFeed');
    feedButton.addEventListener('click', () => {
      console.log('cliked the play button');
      if (this.hunger <= 10 && this.hunger > 0) {
        this.hunger -= 1;
      }
      console.log(this.hunger);
      this.updateDisplays();
    });
    return this.hunger;
  };

  private sleep = (): number => {
    const sleepButton = document.querySelector('#buttonSleep');
    sleepButton.addEventListener('click', () => {
      console.log('cliked the feed button');
      if (this.energy < 10 && this.energy >= 0) {
        this.energy += 1;
      }
      if (this.hunger < 10 && this.hunger >= 0) {
        this.hunger += 1;
      }
      this.updateDisplays();
      console.log(this.energy);
    });
    return this.energy;
  };

  private play = (): number => {
    const playButton = document.querySelector('#buttonPlay');
    playButton.addEventListener('click', () => {
      console.log('cliked the play button');
      if (this.mood < 10 && this.mood >= 0) {
        this.mood += 1;
      }
      if (this.energy <= 10 && this.energy > 0) {
        this.energy -= 1;
      }
      console.log(this.energy);
      this.updateDisplays();
    });
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

  /**
   *
   * @returns the bool for when the cat is dead
   */
  public getIsAlive(): boolean {
    // this.alive = false;
    return this.alive;
  }

  /**
   *
   * @returns returns the energy
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   *
   * @returns the mood
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   *
   * @returns returns the hunger var
   */
  public getHunger(): number {
    return this.hunger;
  }

  /**
   * to set the hunger var
   *
   * @param hunger number of the hunger var
   */
  public setHunger(hunger: number): void {
    this.hunger = hunger;
  }

  /**
   * to set the hunger var
   *
   * @param mood number of the hunger var
   */
  public setMood(mood: number): void {
    this.mood = mood;
  }

  /**
   * to set the hunger var
   *
   * @param energy number of the hunger var
   */
  public setEnergy(energy: number): void {
    this.energy = energy;
  }

  /**
   *
   */
  public ignore(): void {
    console.log('ignore werkt');
    this.isAlive();
    if (this.alive) {
      if (this.mood > 0) {
        this.mood -= 1;
      }
      this.hunger += 1;
      this.energy -= 1;
    }
  }
}
