export class Settings {
  public min: number;
  public max: number;
  public upperBound: number;
  public lowerBound: number;
  public numOfPoints: number;
  constructor() {
    this.min = -0.5;
    this.max = 0.5;
    this.lowerBound = -0.3;
    this.upperBound = 0.3;
    this.numOfPoints = 30;
  }
}
