import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Settings {
  //General parameters
  public numOfPoints: number;
  public period: Number;
  // Drip parameters
  public samplePointsDrip: number;
  public dripMin: number;
  public dripMax: number;
  public dripUpperBound: number;
  public dripLowerBound: number;
  public nominal_FR_R: number;
  public nominal_FR_L: number;
  public nominal_RE_R: number;
  public nominal_RE_L: number;
  public greenPercentDrip: number;
  public redPercentDrip: number;

  // Drip symmetry parameters
  public nominal_DripL_Sym: number;
  public nominal_DripR_Sym: number;
  public samplePointsSym: number;
  public dripSymMin: number;
  public dripSymMax: number;
  public dripSymNorFR: number;
  public dripSymNorRE: number;
  public greenPercentDripSym: number;
  public redPercentDripSym: number;

  // B-PITCH parameters
  public nominal_FR_BP: number;
  public nominal_RE_BP: number;
  public samplePointsBP: number;
  public BPMax:number;
  public BPMin: number;
  public greenPercentBP: number;
  public redPercentBP:number;

  // ROOF PICK parameters

  public nominal_FR_RP:number;
  public nominal_RE_RP:number;
  public samplePointsRP: number;
  public RPMax: number;
  public RPMin: number;
  public greenPercentRP: number;
  public redPercentRP: number;

  constructor() {
    // this.dripMin = -0.5;
    // this.dripMax = 0.5;
    // this.dripUpperBound = -0.3;
    // this.dripLowerBound = 0.3;
    this.numOfPoints = 30;
    this.period = 14;

    // this.dripSymMin = -1.0;
    // this.dripSymMax = 1.0;

    // drip initialization
    this.samplePointsDrip = 30;
    this.dripMax = .5;
    this.dripMin = -.5;
    this.nominal_FR_L=.1;
    this.nominal_FR_R=0;
    this.nominal_RE_L=0;
    this.nominal_RE_R=0;
    this.greenPercentDrip = 80;
    this.redPercentDrip=20;

    // drip symmetry
    this.nominal_DripL_Sym = 0;
    this.nominal_DripR_Sym = 0;
    this.dripSymMin = -1;
    this.dripSymMax = 1;
    this.dripSymNorFR=0.03;
    this.dripSymNorRE=0;
    this.greenPercentDripSym = 80;
    this.redPercentDripSym = 20;
    this.samplePointsSym = 30;

    // B-pitch
    this.BPMax = 0.5;
    this.BPMin = -0.5;
    this.nominal_FR_BP = 0;
    this.nominal_RE_BP = 0;
    this.greenPercentBP = 80;
    this.redPercentBP = 20;
    this.samplePointsBP = 30;

    // RP
    this.RPMax = 0.4;
    this.RPMin = -0.4;
    this.greenPercentRP = 50;
    this.redPercentRP = 30;
    this.samplePointsRP = 30;
    this.nominal_FR_RP=0;
    this.nominal_RE_RP=0;
  }
}

export class Setting {
  Max: Number;
  Min: Number;
  greenPercent: Number;
  redPercent: Number;
  pointsNum: Number;
  nominal: Number;
}
