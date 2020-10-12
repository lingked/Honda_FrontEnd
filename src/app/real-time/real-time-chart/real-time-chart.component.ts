import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';

import { SettingService } from './../../service/SettingService';

@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.scss'],
})
export class RealTimeChartComponent implements OnInit {
  @Input() data:any;
  @Input() labels: [];
  @Input() lineChartOptions: {};
  @Input() lineChartOptionsV: {};
  @Input() lineChartType: String;
  @Input() colors: [];
  @Input() lineChartLegend: [];

  @Input() pieData: [];
  @Input() pieChartLabels: [];
  @Input() pieChartType: String;
  @Input() pieChartColors;

  @Input() checked: boolean;

  public dripData: [[{}],[{}],[{}],[{}]];

  public lineChartOptionsDrip:{};
  public lineChartOptionsDripList:[{}, {}, {}, {}];

  public lineChartOptionsDS:{};
  public lineChartSymDripList:[{}, {}]

  public lineChartOptionsBP: {};
  public lineChartBPList: [{},{}];

  public lineChartOptionsRP: {};
  public lineChartRPList: [{},{}];


  public dripSymData: [[{}], [{}]];

  public bPitch:[[{}], [{}]];

  public RPL:[[{}], [{}]];

  public dripAnnotations;

  public labelMFL: Array<any> = [
    {
      data:[],
      label:[]
    }
  ]

  public settings;


  constructor(settingService: SettingService,) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {
    // console.log(this.data);
    this.dripData = [
      [{ data: this.data.FLD, label: 'FRONT LEFT' }],
      [{ data: this.data.FRD, label: 'FRONT RIGHT' }],
      [{ data: this.data.RLD, label: 'REAR LEFT' }],
      [{ data: this.data.RRD, label: 'REAR RIGHT' }]
    ]


    this.dripSymData = [
      [{
        data: this.data.FSY, label: 'FRONT SYMMETRY'
      }],
      [{
        data: this.data.FRD, label: 'REAR SYMMETRY'
      }]
    ]

    this.bPitch = [
      [{
        data: this.data.BF, label: 'FRONT'
      }],[{
        data: this.data.BR, label: 'REAR'
      }]
    ]

    this.RPL = [
      [{
        data: this.data.RPLFR, label: 'FRONT'
      }],[{
        data: this.data.RPLRE, label: 'REAR'
      }]
    ]

    // settings

    this.dripAnnotations = [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.settings.dripMax,
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
    };

    this.lineChartOptionsDripList = [
      {...this.lineChartOptionsDrip,
        annotation:{
          annotations:[
            ...this.dripAnnotations,
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-3',
              value: .2,
              borderColor: 'black',
              borderWidth: .7,
              label:{
                enabled: true,
                content: 'Nominal'
          }}]
        }
      },
      {...this.lineChartOptionsDrip,},
      {...this.lineChartOptionsDrip,},
      {...this.lineChartOptionsDrip,}
    ]

    this.lineChartOptionsDS = {

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
        annotations:
        [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: this.settings.dripSymMax,
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
        },]
      }
    }

    this.lineChartSymDripList = [
      {...this.lineChartOptionsDS},
      {...this.lineChartOptionsDS}
    ]

    this.lineChartBPList = this.lineChartSymDripList;

    this.lineChartRPList = this.lineChartSymDripList;;

  }
}
