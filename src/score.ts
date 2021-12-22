export default class ScoreCounter {
  private score: number;

  /**
   *
   */
  constructor() {
    this.score = 0;
  }

  /**
   * you can set de score
   *
   * @param score number of point you have at the moment
   */
  public setSore = (score: number): void => {
    this.score += score;
  };

  public getScore = (): number => this.score;
}
