import NumberDisplay from './NumberDisplay.js';
import Ticker from './Ticker.js';
import Build from './build.js';

/**
 * The ClockDisplay class implements a digital clock display for a
 * European-style 24 hour clock. The clock shows hours and minutes. The
 * range of the clock is 00:00 (midnight) to 23:59 (one minute before
 * midnight).
 *
 * The clock display receives "ticks" (via the timeTick method) every minute
 * and reacts by incrementing the display. This is done in the usual clock
 * fashion: the hour increments when the minutes roll over to zero.
 *
 * @author Michael Kölling, David J. Barnes and BugSlayer
 */
export default class ClockDisplay {
  private hours: NumberDisplay;

  private minutes: NumberDisplay;

  private seconds: NumberDisplay;

  private output: void;

  private ticker: Ticker;

  /**
   * Construct a new ClockDisplay instance
   *
   * @param output The HTMLElement where the clock output should
   *   be displayed
   */
  public constructor(output: void) {
    this.output = output;
    this.hours = new NumberDisplay(24);
    this.minutes = new NumberDisplay(60);
    this.seconds = new NumberDisplay(60);
    // this.ticker = new Ticker(this, 1000);
    // this.updateDisplay();
  }

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * This method should get called once every minute - it makes the clock    display
   * go one minute forward.
   *
   * @param timeTicking when the time is stopped the bool will be false and the time will
   * stop ticking
   */
  public timeTick(timeTicking: boolean): string {
    if (timeTicking) {
      this.seconds.increment();
      if (this.seconds.getValue() === 0) {
        this.minutes.increment();
        if (this.minutes.getValue() === 0) {
          this.hours.increment();
        }
      }
    }
    return this.updateTimeDisplay();
  }

  /**
   * Set the time of the display to the specified hour and minute.
   *
   * @param hours the Hours value as a `string`
   * @param minutes the Minutes value as a `string`
   * @param seconds the Seconds value as a `string`
   */
  public setTime(hours: string, minutes: string, seconds: string): void {
    // Try to update the hours value
    this.hours.setStringValue(hours);
    // Try to update the minutes value
    this.minutes.setStringValue(minutes);
    // Try to update the seconds value
    this.seconds.setStringValue(seconds);

    // Update the display
    this.updateTimeDisplay();
  }

  private updateTimeDisplay = (): string => {
    const displayString = `${this.hours.getStringValue()}:${this.minutes.getStringValue()}:${this.seconds.getStringValue()}`;
    // document.querySelector('#displayTime').innerHTML = displayString;
    return displayString;
  };
}
