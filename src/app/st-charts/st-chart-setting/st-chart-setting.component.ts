import { Component, OnInit, Input } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { SettingService } from './../../service/SettingService';

import { CsvItem } from '../../model/CsvItem';
import { StData } from '../../model/RealTimeData';
import { IfStmt } from '@angular/compiler';

class Checks {
  FLD: boolean;
  FRD: boolean;
  RLD: boolean;
  RRD: boolean;
  FSY: boolean;
  RSY: boolean;
  BF: boolean;
  BR: boolean;
  RPLFR: boolean;
  RPLRE: boolean;
  csvTable: boolean;
}

@Component({
  selector: 'app-st-chart-setting',
  templateUrl: './st-chart-setting.component.html',
  styleUrls: ['./st-chart-setting.component.scss'],
})
export class StChartSettingComponent implements OnInit {
  @Input() data: StData;
  @Input() csvSrcData: any;
  @Input() labels: [];
  @Input() transformedLabels: [];
  @Input() totals: [];
  @Input() averages: [number, number, number, number, number, number, number, number, number, number];
  @Input() num: number;
  @Input() checks: Checks;
  @Input() checkArr: [];
  @Input() ready: boolean;

  public settings: any;

  public lineChartOptions: {};

  public lineChartType = 'line';

  public lineChartTypes = [
    'line',
    'line',
    'line',
    'line',
    'scatter',
    'scatter',
    'line',
    'line',
    'scatter',
    'scatter',
  ];

  public lineChartLegend = true;

  public csvItem: CsvItem;

  public colors = [
    {
      borderColor: 'slategrey',
      pointBackgroundColor: 'black',
      pointBorderColor: 'dark',
    },
  ];

  public lineChartPlugins = [pluginAnnotations];

  public itemData: any;

  public lables = [
    'DRIP FRONT LEFT',
    'DRIP FRONT RIGHT',
    'DRIP REAR LEFT',
    'DRIP REAR RIGHT',
    'FRONT SYMMETRY',
    'REAR SYMMETRY',
    'BPITCH FRONT',
    'BPITCH REAR',
    'ROOF PICK FRONT',
    'ROOF PICK REAR',
  ];

  public lineChartOptionsDrip: {};
  public lineChartOptionsDripList: [{}, {}, {}, {}];
  public dripAnnotations: {};

  public lineChartOptionsDS: {};
  public lineChartOptionsDSList: [{}, {}];
  public DSAnnotations: {};

  public lineChartOptionsBP: {};
  public lineChartOptionsBPList: [{}, {}];
  public BPAnnotations: {};

  public lineChartOptionsRP: {};
  public lineChartOptionsRPList: [{}, {}];
  public RPAnnotations: {};

  public lineChartOptionList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  public delayStatus: boolean = false;

  // csv
  status: any[];
  formula: string = 'Formula 1';

  constructor(public settingService: SettingService) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {

    this.initialize(0);

    // this.lineChartOptions = {
    //   backgoundColor: ['dark'],
    //   responsive: true,
    //   animation: false,
    //   elements: {
    //     line: {
    //       tension: 0,
    //       fill: false,
    //       borderWidth: 1,
    //       borderColor: 'red',
    //       backgroundColor: 'red',
    //     },
    //   },
    //   scales: {
    //     xAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           type: 'time',
    //           time: {
    //             unit: 'minute',
    //           },
    //         },
    //       },
    //     ],
    //     yAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           steps: 10,
    //           stepValue: 0.1,
    //           max: this.settings.dripMax,
    //           min: this.settings.dripMin,
    //         },
    //       },
    //     ],
    //   },
    // };

    // this.dripAnnotations = [
    //   {
    //     type: 'line',
    //     mode: 'horizontal',
    //     scaleID: 'y-axis-0',
    //     value: this.settings.nominal_FR_L,
    //     borderColor: 'red',
    //     borderWidth: 0.5,
    //     label: {
    //       enabled: true,
    //       content: 'nominal',
    //       position: 'left',
    //     },
    //   },
    //   {
    //     type: 'line',
    //     mode: 'horizontal',
    //     scaleID: 'y-axis-0',
    //     value: this.averages[0],
    //     borderColor: 'blue',
    //     borderWidth: 0.7,
    //     label: {
    //       enabled: true,
    //       content: 'average',
    //       position: 'left',
    //     },
    //   },

    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-0',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.dripMax,
    //     yMax: this.settings.dripMax * (1 + this.settings.redPercentDrip / 100),
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-1',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.dripMin * (1 + this.settings.redPercentDrip / 100),
    //     yMax: this.settings.dripMin,
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-2',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.dripMin * (this.settings.greenPercentDrip / 100),
    //     yMax: this.settings.dripMax * (this.settings.greenPercentDrip / 100),
    //     borderColor: 'rgba(0, 128, 0, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(0, 128, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-3',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.dripMax * (this.settings.greenPercentDrip / 100),
    //     yMax: this.settings.dripMax,
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-4',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.dripMin,
    //     yMax: this.settings.dripMin * (this.settings.greenPercentDrip / 100),
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    // ];

    // this.lineChartOptionsDripList = [
    //   {
    //     ...this.lineChartOptions,
    //     scales: {
    //       xAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             type: 'time',
    //             time: {
    //               unit: 'minute',
    //             },
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             steps: 10,
    //             stepValue: 0.1,
    //             max:
    //               this.settings.dripMax *
    //               (1 + this.settings.redPercentDrip / 100),
    //             min:
    //               this.settings.dripMin *
    //               (1 + this.settings.redPercentDrip / 100),
    //           },
    //         },
    //       ],
    //     },
    //     annotation: {
    //       annotations: this.dripAnnotations,
    //     },
    //   },
    //   {
    //     ...this.lineChartOptions,
    //     scales: {
    //       xAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             type: 'time',
    //             time: {
    //               unit: 'minute',
    //             },
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             steps: 10,
    //             stepValue: 0.1,
    //             max:
    //               this.settings.dripMax *
    //               (1 + this.settings.redPercentDrip / 100),
    //             min:
    //               this.settings.dripMin *
    //               (1 + this.settings.redPercentDrip / 100),
    //           },
    //         },
    //       ],
    //     },
    //     annotation: {
    //       annotations: this.dripAnnotations,
    //     },
    //   },
    //   {
    //     ...this.lineChartOptions,
    //     scales: {
    //       xAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             type: 'time',
    //             time: {
    //               unit: 'minute',
    //             },
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             steps: 10,
    //             stepValue: 0.1,
    //             max:
    //               this.settings.dripMax *
    //               (1 + this.settings.redPercentDrip / 100),
    //             min:
    //               this.settings.dripMin *
    //               (1 + this.settings.redPercentDrip / 100),
    //           },
    //         },
    //       ],
    //     },
    //     annotation: {
    //       annotations: this.dripAnnotations,
    //     },
    //   },
    //   {
    //     ...this.lineChartOptions,
    //     scales: {
    //       xAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             type: 'time',
    //             time: {
    //               unit: 'minute',
    //             },
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           display: true,
    //           ticks: {
    //             steps: 10,
    //             stepValue: 0.1,
    //             max:
    //               this.settings.dripMax *
    //               (1 + this.settings.redPercentDrip / 100),
    //             min:
    //               this.settings.dripMin *
    //               (1 + this.settings.redPercentDrip / 100),
    //           },
    //         },
    //       ],
    //     },
    //     annotation: {
    //       annotations: this.dripAnnotations,
    //     },
    //   },
    // ];

    // this.DSAnnotations = [
    //   {
    //     type: 'line',
    //     mode: 'vertical',
    //     scaleID: 'y-axis-0',
    //     value: this.settings.dripSymNorFR,
    //     borderColor: 'black',
    //     borderWidth: 0.5,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },
    //   {
    //     type: 'line',
    //     mode: 'vertical',
    //     scaleID: 'y-axis-0',
    //     value: this.settings.dripSymMin,
    //     borderColor: 'black',
    //     borderWidth: 0.3,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },

    //   // type: "box",
    //   //     drawTime: "beforeDatasetsDraw",
    //   //     id: "a-box-1-ver",
    //   //     xScaleID: "x-axis-1",
    //   //     yScaleID: "y-axis-1",
    //   //     xMin: -0.3,
    //   //     xMax: 0.3,

    //   //     borderColor: "green",
    //   //     borderWidth: 2,
    //   //     backgroundColor: "green",

    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-0',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.dripSymMax,
    //     xMax:
    //       this.settings.dripSymMax *
    //       (1 + this.settings.redPercentDripSym / 100),
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-1',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin:
    //       this.settings.dripSymMin *
    //       (1 + this.settings.redPercentDripSym / 100),
    //     xMax: this.settings.dripSymMin,
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-2',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin:
    //       this.settings.dripSymMin * (this.settings.greenPercentDripSym / 100),
    //     xMax:
    //       this.settings.dripSymMax * (this.settings.greenPercentDripSym / 100),
    //     borderColor: 'rgba(0, 128, 0, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(0, 128, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-3',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin:
    //       this.settings.dripSymMax * (this.settings.greenPercentDripSym / 100),
    //     xMax: this.settings.dripSymMax,
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-4',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.dripSymMin,
    //     xMax:
    //       this.settings.dripSymMin * (this.settings.greenPercentDripSym / 100),
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    // ];

    // this.BPAnnotations = [
    //   {
    //     type: 'line',
    //     mode: 'horizontal',
    //     scaleID: 'y-axis-0',
    //     value: this.settings.nominal_FR_BP,
    //     borderColor: 'black',
    //     borderWidth: 0.5,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },
    //   {
    //     type: 'line',
    //     mode: 'horizontal',
    //     scaleID: 'y-axis-1',
    //     value: this.settings.BPMin,
    //     borderColor: 'black',
    //     borderWidth: 0.3,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },

    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-0',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.BPMax,
    //     yMax: this.settings.BPMax * (1 + this.settings.redPercentDripSym / 100),
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-1',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.BPMin * (1 + this.settings.redPercentBP / 100),
    //     yMax: this.settings.BPMin,
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-2',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.BPMin * (this.settings.greenPercentBP / 100),
    //     yMax: this.settings.BPMax * (this.settings.greenPercentBP / 100),
    //     borderColor: 'rgba(0, 128, 0, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(0, 128, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-3',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.BPMax * (this.settings.greenPercentBP / 100),
    //     yMax: this.settings.BPMax,
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-4',
    //     xScaleID: 'x-axis-0',
    //     yScaleID: 'y-axis-0',
    //     yMin: this.settings.BPMin,
    //     yMax: this.settings.BPMin * (this.settings.greenPercentBP / 100),
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    // ];

    // this.RPAnnotations = [
    //   {
    //     type: 'line',
    //     mode: 'vertical',
    //     scaleID: 'y-axis-0',
    //     value: this.settings.nominal_FR_RP,
    //     borderColor: 'black',
    //     borderWidth: 0.5,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },
    //   {
    //     type: 'line',
    //     mode: 'vertical',
    //     scaleID: 'y-axis-1',
    //     value: this.settings.RPMin,
    //     borderColor: 'black',
    //     borderWidth: 0.3,
    //     label: {
    //       enabled: false,
    //       content: 'test label',
    //     },
    //   },

    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-0',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.RPMax,
    //     xMax: this.settings.RPMax * (1 + this.settings.redPercentRP / 100),
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-1',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.RPMin * (1 + this.settings.redPercentRP / 100),
    //     xMax: this.settings.RPMin,
    //     borderColor: 'rgba(255, 0, 0, 0.7)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-2',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.RPMin * (this.settings.greenPercentRP / 100),
    //     xMax: this.settings.RPMax * (this.settings.greenPercentRP / 100),
    //     borderColor: 'rgba(0, 128, 0, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(0, 128, 0, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-3',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.RPMax * (this.settings.greenPercentRP / 100),
    //     xMax: this.settings.RPMax,
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    //   {
    //     type: 'box',
    //     drawTime: 'beforeDatasetsDraw',
    //     id: 'y-box-4',
    //     xScaleID: 'x-axis-1',
    //     yScaleID: 'y-axis-1',
    //     xMin: this.settings.RPMin,
    //     xMax: this.settings.RPMin * (this.settings.greenPercentRP / 100),
    //     borderColor: 'rgba(235, 174, 52, 0.5)',
    //     borderWidth: 0,
    //     backgroundColor: 'rgba(235, 174, 52, 0.3)',
    //   },
    // ];

    // this.lineChartOptionsDrip = {
    //   ...this.lineChartOptions,
    //   scales: {
    //     xAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           type: 'time',
    //           time: {
    //             unit: 'minute',
    //           },
    //         },
    //       },
    //     ],
    //     yAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           steps: 10,
    //           stepValue: 0.1,
    //           max:
    //             this.settings.dripMax *
    //             (1 + this.settings.redPercentDrip / 100),
    //           min:
    //             this.settings.dripMin *
    //             (1 + this.settings.redPercentDrip / 100),
    //         },
    //       },
    //     ],
    //   },
    //   annotation: {
    //     annotations: this.dripAnnotations,
    //   },
    // };

    // this.lineChartOptionsDS = {
    //   ...this.lineChartOptions,
    //   backgoundColor: ['dark'],
    //   responsive: true,
    //   animation: false,
    //   elements: {
    //     line: {
    //       tension: 0,
    //       fill: false,
    //       borderWidth: 1,
    //       color: 'blue',
    //     },
    //   },
    //   scales: {
    //     yAxes: [
    //       {
    //         type: 'time',
    //         time: {
    //           unit: 'minute',
    //           displayFormats: {
    //             minute: 'lll',
    //           },
    //         },
    //         display: true,
    //         distribution: 'series',
    //       },
    //     ],
    //     xAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           steps: 10,
    //           stepValue: 0.1,
    //           max:
    //             this.settings.dripSymMax *
    //             (1 + this.settings.redPercentDripSym / 100),
    //           min:
    //             this.settings.dripSymMin *
    //             (1 + this.settings.redPercentDripSym / 100),
    //         },
    //       },
    //     ],
    //   },
    //   annotation: {
    //     annotations: this.DSAnnotations,
    //   },
    // };

    // this.lineChartOptionsBP = {
    //   backgoundColor: ['dark'],
    //   responsive: true,
    //   animation: false,
    //   elements: {
    //     line: {
    //       tension: 0,
    //       fill: false,
    //       borderWidth: 1,
    //       color: 'blue',
    //     },
    //   },
    //   scales: {
    //     xAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           type: 'time',
    //           time: {
    //             unit: 'minute',
    //           },
    //         },
    //       },
    //     ],
    //     yAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           steps: 10,
    //           stepValue: 0.1,
    //           max: this.settings.BPMax * (1 + this.settings.redPercentBP / 100),
    //           min: this.settings.BPMin * (1 + this.settings.redPercentBP / 100),
    //         },
    //       },
    //     ],
    //   },
    //   annotation: {
    //     annotations: this.BPAnnotations,
    //   },
    // };

    // this.lineChartOptionsRP = {
    //   backgoundColor: ['dark'],
    //   responsive: true,
    //   animation: false,
    //   elements: {
    //     line: {
    //       tension: 0,
    //       fill: false,
    //       borderWidth: 1,
    //       color: 'blue',
    //     },
    //   },
    //   scales: {
    //     xAxes: [
    //       {
    //         display: true,
    //         ticks: {
    //           steps: 10,
    //           stepValue: 0.1,
    //           max: this.settings.RPMax * (1 + this.settings.redPercentRP / 100),
    //           min: this.settings.RPMin * (1 + this.settings.redPercentRP / 100),
    //         },
    //       },
    //     ],
    //     yAxes: [
    //       {
    //         type: 'time',
    //         time: {
    //           unit: 'minute',
    //           displayFormats: {
    //             minute: 'llll',
    //           },
    //         },
    //         display: true,
    //         distribution: 'series',
    //       },
    //     ],
    //   },
    //   annotation: {
    //     annotations: this.RPAnnotations,
    //   },
    // };

    // this.lineChartOptionList = [
    //   this.lineChartOptionsDripList[0],
    //   this.lineChartOptionsDripList[1],
    //   this.lineChartOptionsDripList[2],
    //   this.lineChartOptionsDripList[3],
    //   this.lineChartOptionsDS,
    //   this.lineChartOptionsDS,
    //   this.lineChartOptionsBP,
    //   this.lineChartOptionsBP,
    //   this.lineChartOptionsRP,
    //   this.lineChartOptionsRP,
    // ];

    this.itemData = [
      [{ data: this.data.FLD, label: 'DRIP FRONT LEFT' }],
      [{ data: this.data.FRD, label: 'DRIP FRONT RIGHT' }],
      [{ data: this.data.RLD, label: 'DRIP REAR LEFT' }],
      [{ data: this.data.RRD, label: 'DRIP REAR RIGHT' }],
      [
        {
          data: this.data.FSY,
          showLine: true,
          fill: false,
          tension: 0,
          label: 'FRONT SYMMETRY',
        },
      ],
      [
        {
          data: this.data.RSY,
          showLine: true,
          fill: false,
          tension: 0,
          label: 'REAR SYMMETRY',
        },
      ],
      [{ data: this.data.BF, label: 'BPITCH FRONT' }],
      [{ data: this.data.BR, label: 'BPITCH REAR' }],
      [
        {
          data: this.data.RPLFR,
          showLine: true,
          fill: false,
          tension: 0,
          label: 'ROOF PICK FRONT',
        },
      ],
      [
        {
          data: this.data.RPLRE,
          showLine: true,
          fill: false,
          tension: 0,
          label: 'ROOF PICK REAR',
        },
      ],
    ];

    for (let i = this.checkArr.length - 2; i >= 0; i--) {
      if (!this.checkArr[i]) {
        this.itemData.splice(i, 1);
        this.lineChartTypes.splice(i, 1);
        this.lineChartOptionList.splice(i, 1);
      }
    }
  }

  initialize(count: number) {
    setTimeout(()=>{
    this.delayStatus = true && this.ready;
    console.log(count);
    if(!this.delayStatus&&count<5){
      this.initialize(count+1);
      console.log(count);
      return;
    }
    this.lineChartOptions = {
      backgoundColor: ['dark'],
      responsive: true,
      animation: false,
      elements: {
        line: {
          tension: 0,
          fill: false,
          borderWidth: 1,
          borderColor: 'red',
          backgroundColor: 'red',
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              type: 'time',
              time: {
                unit: 'minute',
              },
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              steps: 10,
              stepValue: 0.1,
              max: this.settings.dripMax,
              min: this.settings.dripMin,
            },
          },
        ],
      },
    };

    this.dripAnnotations = [
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.settings.nominal_FR_L,
        borderColor: 'red',
        borderWidth: 0.5,
        label: {
          enabled: true,
          content: 'nominal',
          position: 'left',
        },
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.averages[0],
        borderColor: 'blue',
        borderWidth: 0.7,
        label: {
          enabled: true,
          content: 'average',
          position: 'left',
        },
      },

      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-0',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.dripMax,
        yMax: this.settings.dripMax * (1 + this.settings.redPercentDrip / 100),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-1',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.dripMin * (1 + this.settings.redPercentDrip / 100),
        yMax: this.settings.dripMin,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-2',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.dripMin * (this.settings.greenPercentDrip / 100),
        yMax: this.settings.dripMax * (this.settings.greenPercentDrip / 100),
        borderColor: 'rgba(0, 128, 0, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-3',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.dripMax * (this.settings.greenPercentDrip / 100),
        yMax: this.settings.dripMax,
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-4',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.dripMin,
        yMax: this.settings.dripMin * (this.settings.greenPercentDrip / 100),
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
    ];

    this.lineChartOptionsDripList = [
      {
        ...this.lineChartOptions,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                type: 'time',
                time: {
                  unit: 'minute',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                steps: 10,
                stepValue: 0.1,
                max:
                  this.settings.dripMax *
                  (1 + this.settings.redPercentDrip / 100),
                min:
                  this.settings.dripMin *
                  (1 + this.settings.redPercentDrip / 100),
              },
            },
          ],
        },
        annotation: {
          annotations: this.dripAnnotations,
        },
      },
      {
        ...this.lineChartOptions,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                type: 'time',
                time: {
                  unit: 'minute',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                steps: 10,
                stepValue: 0.1,
                max:
                  this.settings.dripMax *
                  (1 + this.settings.redPercentDrip / 100),
                min:
                  this.settings.dripMin *
                  (1 + this.settings.redPercentDrip / 100),
              },
            },
          ],
        },
        annotation: {
          annotations: this.dripAnnotations,
        },
      },
      {
        ...this.lineChartOptions,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                type: 'time',
                time: {
                  unit: 'minute',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                steps: 10,
                stepValue: 0.1,
                max:
                  this.settings.dripMax *
                  (1 + this.settings.redPercentDrip / 100),
                min:
                  this.settings.dripMin *
                  (1 + this.settings.redPercentDrip / 100),
              },
            },
          ],
        },
        annotation: {
          annotations: this.dripAnnotations,
        },
      },
      {
        ...this.lineChartOptions,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                type: 'time',
                time: {
                  unit: 'minute',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                steps: 10,
                stepValue: 0.1,
                max:
                  this.settings.dripMax *
                  (1 + this.settings.redPercentDrip / 100),
                min:
                  this.settings.dripMin *
                  (1 + this.settings.redPercentDrip / 100),
              },
            },
          ],
        },
        annotation: {
          annotations: this.dripAnnotations,
        },
      },
    ];

    this.DSAnnotations = [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: this.settings.dripSymNorFR,
        borderColor: 'black',
        borderWidth: 0.5,
        label: {
          enabled: false,
          content: 'test label',
        },
      },
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: this.settings.dripSymMin,
        borderColor: 'black',
        borderWidth: 0.3,
        label: {
          enabled: false,
          content: 'test label',
        },
      },

      // type: "box",
      //     drawTime: "beforeDatasetsDraw",
      //     id: "a-box-1-ver",
      //     xScaleID: "x-axis-1",
      //     yScaleID: "y-axis-1",
      //     xMin: -0.3,
      //     xMax: 0.3,

      //     borderColor: "green",
      //     borderWidth: 2,
      //     backgroundColor: "green",

      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-0',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.dripSymMax,
        xMax:
          this.settings.dripSymMax *
          (1 + this.settings.redPercentDripSym / 100),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-1',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin:
          this.settings.dripSymMin *
          (1 + this.settings.redPercentDripSym / 100),
        xMax: this.settings.dripSymMin,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-2',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin:
          this.settings.dripSymMin * (this.settings.greenPercentDripSym / 100),
        xMax:
          this.settings.dripSymMax * (this.settings.greenPercentDripSym / 100),
        borderColor: 'rgba(0, 128, 0, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-3',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin:
          this.settings.dripSymMax * (this.settings.greenPercentDripSym / 100),
        xMax: this.settings.dripSymMax,
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-4',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.dripSymMin,
        xMax:
          this.settings.dripSymMin * (this.settings.greenPercentDripSym / 100),
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
    ];

    this.BPAnnotations = [
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.settings.nominal_FR_BP,
        borderColor: 'black',
        borderWidth: 0.5,
        label: {
          enabled: false,
          content: 'test label',
        },
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-1',
        value: this.settings.BPMin,
        borderColor: 'black',
        borderWidth: 0.3,
        label: {
          enabled: false,
          content: 'test label',
        },
      },

      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-0',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.BPMax,
        yMax: this.settings.BPMax * (1 + this.settings.redPercentDripSym / 100),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-1',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.BPMin * (1 + this.settings.redPercentBP / 100),
        yMax: this.settings.BPMin,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-2',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.BPMin * (this.settings.greenPercentBP / 100),
        yMax: this.settings.BPMax * (this.settings.greenPercentBP / 100),
        borderColor: 'rgba(0, 128, 0, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-3',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.BPMax * (this.settings.greenPercentBP / 100),
        yMax: this.settings.BPMax,
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-4',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        yMin: this.settings.BPMin,
        yMax: this.settings.BPMin * (this.settings.greenPercentBP / 100),
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
    ];

    this.RPAnnotations = [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: this.settings.nominal_FR_RP,
        borderColor: 'black',
        borderWidth: 0.5,
        label: {
          enabled: false,
          content: 'test label',
        },
      },
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'y-axis-1',
        value: this.settings.RPMin,
        borderColor: 'black',
        borderWidth: 0.3,
        label: {
          enabled: false,
          content: 'test label',
        },
      },

      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-0',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.RPMax,
        xMax: this.settings.RPMax * (1 + this.settings.redPercentRP / 100),
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-1',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.RPMin * (1 + this.settings.redPercentRP / 100),
        xMax: this.settings.RPMin,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-2',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.RPMin * (this.settings.greenPercentRP / 100),
        xMax: this.settings.RPMax * (this.settings.greenPercentRP / 100),
        borderColor: 'rgba(0, 128, 0, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-3',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.RPMax * (this.settings.greenPercentRP / 100),
        xMax: this.settings.RPMax,
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
      {
        type: 'box',
        drawTime: 'beforeDatasetsDraw',
        id: 'y-box-4',
        xScaleID: 'x-axis-1',
        yScaleID: 'y-axis-1',
        xMin: this.settings.RPMin,
        xMax: this.settings.RPMin * (this.settings.greenPercentRP / 100),
        borderColor: 'rgba(235, 174, 52, 0.5)',
        borderWidth: 0,
        backgroundColor: 'rgba(235, 174, 52, 0.3)',
      },
    ];

    this.lineChartOptionsDrip = {
      ...this.lineChartOptions,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              type: 'time',
              time: {
                unit: 'minute',
              },
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              steps: 10,
              stepValue: 0.1,
              max:
                this.settings.dripMax *
                (1 + this.settings.redPercentDrip / 100),
              min:
                this.settings.dripMin *
                (1 + this.settings.redPercentDrip / 100),
            },
          },
        ],
      },
      annotation: {
        annotations: this.dripAnnotations,
      },
    };

    this.lineChartOptionsDS = {
      ...this.lineChartOptions,
      backgoundColor: ['dark'],
      responsive: true,
      animation: false,
      elements: {
        line: {
          tension: 0,
          fill: false,
          borderWidth: 1,
          color: 'blue',
        },
      },
      scales: {
        yAxes: [
          {
            type: 'time',
            time: {
              unit: 'minute',
              displayFormats: {
                minute: 'lll',
              },
            },
            display: true,
            distribution: 'series',
          },
        ],
        xAxes: [
          {
            display: true,
            ticks: {
              steps: 10,
              stepValue: 0.1,
              max:
                this.settings.dripSymMax *
                (1 + this.settings.redPercentDripSym / 100),
              min:
                this.settings.dripSymMin *
                (1 + this.settings.redPercentDripSym / 100),
            },
          },
        ],
      },
      annotation: {
        annotations: this.DSAnnotations,
      },
    };

    this.lineChartOptionsBP = {
      backgoundColor: ['dark'],
      responsive: true,
      animation: false,
      elements: {
        line: {
          tension: 0,
          fill: false,
          borderWidth: 1,
          color: 'blue',
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              type: 'time',
              time: {
                unit: 'minute',
              },
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              steps: 10,
              stepValue: 0.1,
              max: this.settings.BPMax * (1 + this.settings.redPercentBP / 100),
              min: this.settings.BPMin * (1 + this.settings.redPercentBP / 100),
            },
          },
        ],
      },
      annotation: {
        annotations: this.BPAnnotations,
      },
    };

    this.lineChartOptionsRP = {
      backgoundColor: ['dark'],
      responsive: true,
      animation: false,
      elements: {
        line: {
          tension: 0,
          fill: false,
          borderWidth: 1,
          color: 'blue',
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              steps: 10,
              stepValue: 0.1,
              max: this.settings.RPMax * (1 + this.settings.redPercentRP / 100),
              min: this.settings.RPMin * (1 + this.settings.redPercentRP / 100),
            },
          },
        ],
        yAxes: [
          {
            type: 'time',
            time: {
              unit: 'minute',
              displayFormats: {
                minute: 'llll',
              },
            },
            display: true,
            distribution: 'series',
          },
        ],
      },
      annotation: {
        annotations: this.RPAnnotations,
      },
    };

    this.lineChartOptionList = [
      this.lineChartOptionsDripList[0],
      this.lineChartOptionsDripList[1],
      this.lineChartOptionsDripList[2],
      this.lineChartOptionsDripList[3],
      this.lineChartOptionsDS,
      this.lineChartOptionsDS,
      this.lineChartOptionsBP,
      this.lineChartOptionsBP,
      this.lineChartOptionsRP,
      this.lineChartOptionsRP,
    ];
  }, 300);
}


  downloadCSV() {
    var data = [];

    for (let i = 0; i < this.num; i++) {
      data.push(
        new CsvItem(
          this.labels[i],
          this.csvSrcData.FLD[i],
          this.csvSrcData.FRD[i],
          this.csvSrcData.RLD[i],
          this.csvSrcData.RRD[i],
          this.csvSrcData.FSY[i],
          this.csvSrcData.RSY[i],
          this.csvSrcData.BF[i],
          this.csvSrcData.BR[i],
          this.csvSrcData.RPLFR[i],
          this.csvSrcData.RPLRE[i]
        )
      );
    }
    var options = {
      title: 'Selected data',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'Timestamp',
        'drip front left',
        'drip front right',
        'drip rear left',
        'drip rear right',
        'dirp symmetry front',
        'drip symmetry rear',
        'drip BPitch front',
        'drip BPitch rear',
        'roof pick front',
        'roof pick rear',
      ],
    };
    new Angular2Csv(data, 'csv_' + new Date().toString(), options);
  }
}


