import Catagochi from './app.js';

export default class Ticker {
  private lastTickTimeStamp: number;

  private catagochi: Catagochi;

  private interval: number;

  private isStopped: boolean;

  // private stopStartButton: HTMLInputElement;

  /**
   * Constructor for objects of class Ticker.
   *
   * @param catagochi n
   * @param interval n
   */
  public constructor(catagochi: Catagochi, interval: number) {
    this.catagochi = catagochi;
    this.interval = interval;
    this.isStopped = false;
    // this.stopStartButton = document.querySelector('#stopStartTime');
    this.checkIfStopped();
    this.startRunning();
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

    if (timestamp - this.lastTickTimeStamp >= this.interval) {
      // Call the method of this object that needs to be called
      this.catagochi.gameTick();
      this.lastTickTimeStamp = timestamp;

      // // checked of de cat dood is, misschien beter om gameTick een bool mee te geven
      // if (!(this.cat.alive) {
      //   this.isStopped = false;
      // }
    }
    // Request the browser to call the step method on next animation frame
    if (this.isStopped === false) {
      requestAnimationFrame(this.step);
    }
  };

  private startRunning = () => {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };

  private checkIfStopped = () => {
    console.log(this.isStopped);
    return this.isStopped;
  };

  public setIsStopped = (isStopped: boolean): void => {
    this.isStopped = isStopped;
  };
}
