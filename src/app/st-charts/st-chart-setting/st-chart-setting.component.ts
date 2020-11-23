import { Component, OnInit, Input } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { SettingService } from './../../service/SettingService';


import {CsvItem} from '../../model/CsvItem';

class Checks { FLD: boolean; FRD: boolean; RLD: boolean; RRD: boolean; FSY:boolean; RSY:boolean; BF:boolean; BR:boolean; RPLFR:boolean; RPLRE:boolean; csvTable:boolean };

@Component({
  selector: 'app-st-chart-setting',
  templateUrl: './st-chart-setting.component.html',
  styleUrls: ['./st-chart-setting.component.scss']
})
export class StChartSettingComponent implements OnInit {

  @Input() data:any;
  @Input() labels:[]
  @Input() totals:{}
  @Input() num:number
  @Input() checks:Checks;
  @Input() checkArr:[]

  public settings:any;

  public lineChartOptions:{};

  public lineChartType = 'line';

  public lineChartLegend = true;

  public csvData = [];

  public csvItem:CsvItem;

  public colors = [
    {
      borderColor: 'slategrey',
      pointBackgroundColor: 'black',
      pointBorderColor: 'dark',
    },
  ];

  public lineChartPlugins = [pluginAnnotations];

  public itemData: [[{}],[{}],[{}],[{}],[{}], [{}], [{}], [{}], [{}], [{}]];

  public lineChartOptionsDrip:{};
  public dripAnnotations:{};

  public lineChartOptionsDS:{};
  public DSAnnotations:{};

  public lineChartOptionsBP: {};
  public BPAnnotations:{};

  public lineChartOptionsRP: {};
  public RPAnnotations:{};

  public lineChartOptionList:[{},{},{},{},{},{},{},{},{},{}];

  // csv
  status: any[];
  formula:string = "Formula 1";

  constructor(public settingService: SettingService) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {
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
          backgroundColor: 'red'
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

    this.dripAnnotations = [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.settings.nominal_FR_L,
      borderColor: 'black',
      borderWidth: .5,
      label:{
        enabled: false,
        content: 'test label'
      }
    },
    {
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-1',
      value: this.settings.dripMin,
      borderColor: 'black',
      borderWidth: .3,
      label:{
        enabled: false,
        content: 'test label'
      }
    },

    {
      type: 'box',
      drawTime: "beforeDatasetsDraw",
      id: 'y-box-0',
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      yMin: this.settings.dripMax,
      yMax: this.settings.dripMax*(1+this.settings.redPercentDrip/100),
      borderColor: "rgba(255, 0, 0, 0.7)",
      borderWidth: 0,
      backgroundColor: "rgba(255, 0, 0, 0.3)",
    },
    {
      type: 'box',
      drawTime: "beforeDatasetsDraw",
      id: 'y-box-1',
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      yMin: this.settings.dripMin*(1+this.settings.redPercentDrip/100),
      yMax: this.settings.dripMin,
      borderColor: "rgba(255, 0, 0, 0.7)",
      borderWidth: 0,
      backgroundColor: "rgba(255, 0, 0, 0.3)",
    },
    {
      type: 'box',
      drawTime: "beforeDatasetsDraw",
      id: 'y-box-2',
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      yMin: this.settings.dripMin*(this.settings.greenPercentDrip/100),
      yMax: this.settings.dripMax*(this.settings.greenPercentDrip/100),
      borderColor: "rgba(0, 128, 0, 0.5)",
      borderWidth: 0,
      backgroundColor: "rgba(0, 128, 0, 0.3)",
    },
    {
      type: 'box',
      drawTime: "beforeDatasetsDraw",
      id: 'y-box-3',
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      yMin: this.settings.dripMax*(this.settings.greenPercentDrip/100),
      yMax: this.settings.dripMax,
      borderColor: "rgba(235, 174, 52, 0.5)",
      borderWidth: 0,
      backgroundColor: "rgba(235, 174, 52, 0.3)",
    },
    {
      type: 'box',
      drawTime: "beforeDatasetsDraw",
      id: 'y-box-4',
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      yMin: this.settings.dripMin,
      yMax: this.settings.dripMin*(this.settings.greenPercentDrip/100),
      borderColor: "rgba(235, 174, 52, 0.5)",
      borderWidth: 0,
      backgroundColor: "rgba(235, 174, 52, 0.3)",
    },
  ]


    this.DSAnnotations=
      [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.settings.dripSymNorFR,
        borderColor: 'black',
        borderWidth: .5,
        label:{
          enabled: false,
          content: 'test label'
        }
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-1',
        value: this.settings.dripSymMin,
        borderColor: 'black',
        borderWidth: .3,
        label:{
          enabled: false,
          content: 'test label'
        }
      },

      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-0',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.dripSymMax,
        yMax: this.settings.dripSymMax*(1+this.settings.redPercentDripSym/100),
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-1',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.dripSymMin*(1+this.settings.redPercentDripSym/100),
        yMax: this.settings.dripSymMin,
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-2',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.dripSymMin*(this.settings.greenPercentDripSym/100),
        yMax: this.settings.dripSymMax*(this.settings.greenPercentDripSym/100),
        borderColor: "rgba(0, 128, 0, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(0, 128, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-3',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.dripSymMax*(this.settings.greenPercentDripSym/100),
        yMax: this.settings.dripSymMax,
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-4',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.dripSymMin,
        yMax: this.settings.dripSymMin*(this.settings.greenPercentDripSym/100),
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
  ]

    this.BPAnnotations=[{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.settings.nominal_FR_BP,
        borderColor: 'black',
        borderWidth: .5,
        label:{
          enabled: false,
          content: 'test label'
        }
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-1',
        value: this.settings.BPMin,
        borderColor: 'black',
        borderWidth: .3,
        label:{
          enabled: false,
          content: 'test label'
        }
      },

      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-0',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.BPMax,
        yMax: this.settings.BPMax*(1+this.settings.redPercentDripSym/100),
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-1',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.BPMin*(1+this.settings.redPercentBP/100),
        yMax: this.settings.BPMin,
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-2',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.BPMin*(this.settings.greenPercentBP/100),
        yMax: this.settings.BPMax*(this.settings.greenPercentBP/100),
        borderColor: "rgba(0, 128, 0, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(0, 128, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-3',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.BPMax*(this.settings.greenPercentBP/100),
        yMax: this.settings.BPMax,
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-4',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.BPMin,
        yMax: this.settings.BPMin*(this.settings.greenPercentBP/100),
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
  ]

    this.RPAnnotations=[{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.settings.nominal_FR_RP,
        borderColor: 'black',
        borderWidth: .5,
        label:{
          enabled: false,
          content: 'test label'
        }
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-1',
        value: this.settings.RPMin,
        borderColor: 'black',
        borderWidth: .3,
        label:{
          enabled: false,
          content: 'test label'
        }
      },

      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-0',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.RPMax,
        yMax: this.settings.RPMax*(1+this.settings.redPercentRP/100),
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-1',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.RPMin*(1+this.settings.redPercentRP/100),
        yMax: this.settings.RPMin,
        borderColor: "rgba(255, 0, 0, 0.7)",
        borderWidth: 0,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-2',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.RPMin*(this.settings.greenPercentRP/100),
        yMax: this.settings.RPMax*(this.settings.greenPercentRP/100),
        borderColor: "rgba(0, 128, 0, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(0, 128, 0, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-3',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.RPMax*(this.settings.greenPercentRP/100),
        yMax: this.settings.RPMax,
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
      {
        type: 'box',
        drawTime: "beforeDatasetsDraw",
        id: 'y-box-4',
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: this.settings.RPMin,
        yMax: this.settings.RPMin*(this.settings.greenPercentRP/100),
        borderColor: "rgba(235, 174, 52, 0.5)",
        borderWidth: 0,
        backgroundColor: "rgba(235, 174, 52, 0.3)",
      },
  ]



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
              max: this.settings.dripMax*(1+this.settings.redPercentDrip/100),
              min: this.settings.dripMin*(1+this.settings.redPercentDrip/100),
            },
          },
        ],
      },
      annotation: {
        annotations:this.dripAnnotations
      }
    }

    this.lineChartOptionsDS={
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
              max: this.settings.dripSymMax*(1+this.settings.redPercentDripSym/100),
              min: this.settings.dripSymMin*(1+this.settings.redPercentDripSym/100),
            },
          },
        ],
      },
      annotation: {
        annotations: this.DSAnnotations
      }
    }

    this.lineChartOptionsBP={
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
              max: this.settings.RPMax*(1+this.settings.redPercentRP/100),
              min: this.settings.RPMin*(1+this.settings.redPercentRP/100),
            },
          },
        ],
      },
      annotation: {
        annotations:
          this.BPAnnotations
      }
    }

    this.lineChartOptionsRP={
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
            max: this.settings.BPMax*(1+this.settings.redPercentBP/100),
            min: this.settings.BPMin*(1+this.settings.redPercentBP/100),
          },
        },
      ],
    },
    annotation: {
      annotations:this.RPAnnotations
    }
    }

    this.lineChartOptionList=[
      this.lineChartOptionsDrip,
      this.lineChartOptionsDrip,
      this.lineChartOptionsDrip,
      this.lineChartOptionsDrip,
      this.lineChartOptionsDS,
      this.lineChartOptionsDS,
      this.lineChartOptionsBP,
      this.lineChartOptionsBP,
      this.lineChartOptionsRP,
      this.lineChartOptionsRP,
    ]

    this.itemData = [
      [{data:this.data.FLD, label:'DRIP FRONT LEFT'}],
      [{data:this.data.FRD, label:'DRIP FRONT RIGHT'}],
      [{data:this.data.RLD, label:'DRIP REAR LEFT'}],
      [{data:this.data.RRD, label:'DRIP REAR RIGHT'}],
      [{data:this.data.FSY, label:'FRONT SYMMETRY'}],
      [{data:this.data.RSY, label:'REAR SYMMETRY'}],
      [{data:this.data.BF, label:'BPITCH FRONT'}],
      [{data:this.data.BR, label:'BPITCH REAR'}],
      [{data:this.data.RPLFR, label:'ROOF PICK FRONT'}],
      [{data:this.data.RPLRE, label:'ROOF PICK REAR'}],
    ]
  }

  downloadCSV() {

    var data=[];

    for(let i=0; i<this.num; i++){
      data.push(new CsvItem(this.labels[i],this.data.FLD[i],this.data.FRD[i],this.data.RLD[i],this.data.RRD[i], this.data.FSY[i],this.data.RSY[i],this.data.BF[i],this.data.BR[i],this.data.RPLFR[i],this.data.RPLRE[i]))
    }
    var options = {
      title: 'Selected data',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: ['Timestamp', 'drip front left', 'drip front right', 'drip rear left', 'drip rear right', 'dirp symmetry front', 'drip symmetry rear', 'drip BPitch front', 'drip BPitch rear', 'roof pick front', 'roof pick rear']
    };
    new Angular2Csv(data, 'csv_' + new Date().toString(), options);
  }

}
