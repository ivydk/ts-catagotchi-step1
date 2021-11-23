/**
 * je wilt de properties niet op public hebben omdat mensen deze dan kunnen aanpassen,
 * daarom geruik je getter en setter, methodes die de waardes teruggeven
 *
 * bijv.  getEnergy(){
 *          return this.energy;
 *        }
 */

import KeyListener from './keyListner';

export default class Cat {
  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  private keyListner: KeyListener;

  private 1: number;

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
  }

  public isAlive = (): boolean => {
    if (this.hunger >= 10 || this.energy <= 0) {
      this.alive = false;
    } else {
      this.alive = true;
    }
    return this.alive;
  };

  public feed = (): void => {
    this.hunger -= 1;
    this.updateDisplays();
  };

  public sleep = (): void => {
    this.energy += 1;
    this.hunger += 1;
    this.updateDisplays();
  };

  public play = (): void => {
    this.mood += 1;
    this.energy -= 1;
    this.updateDisplays();
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
    return this.isAlive();
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
   *
   */
  public ignore(): void {
    this.isAlive();
    if (this.alive) {
      if (this.mood > 0) {
        this.mood -= 1;
      }
      this.hunger += 1;
      this.energy -= 1;
    }
  }

  public meow = (): string => {
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

  public setMood = (mood: number) => {
    this.mood = mood;
  };
}
