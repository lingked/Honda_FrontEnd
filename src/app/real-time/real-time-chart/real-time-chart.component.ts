import { Component, OnInit, Input } from '@angular/core';
import { Settings } from '../../model/Settings';
import { Setting } from '../../model/Settings';

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
  public lineChartSymDripList:[{}, {}];

  public lineChartOptionsBP: {};
  public lineChartBPList: [{},{}];

  public lineChartOptionsRP: {};
  public lineChartRPList: [{},{}];


  public dripSymData: [[{}], [{}]];

  public bPitch:[[{}], [{}]];

  public RPL:[[{}], [{}]];

  public keys: string[];

  public dripAnnotations;

  public labelMFL: Array<any> = [
    {
      data:[],
      label:[]
    }
  ]

  public settings: Settings;

  public settingsData:[Setting, Setting, Setting, Setting, Setting, 
    Setting, Setting, Setting, Setting, Setting];


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
        data: this.data.RSY, label: 'REAR SYMMETRY'
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

    this.keys = Object.keys(this.pieData);

    // settings

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
      }
    }


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
            max: this.settings.BPMax*(1+this.settings.redPercentBP/100),
            min: this.settings.BPMin*(1+this.settings.redPercentBP/100),
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
    }
  }

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
    [{
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
  }
  }





    this.lineChartSymDripList = [
      {...this.lineChartOptionsDS},
      {...this.lineChartOptionsDS}
    ]

    this.lineChartBPList = [
      {...this.lineChartOptionsBP},
      {...this.lineChartOptionsBP}
    ]

    this.lineChartRPList = [
      {...this.lineChartOptionsRP},
      {...this.lineChartOptionsRP}
    ]

    this.settingsData = [
      {
        Max: this.settings.dripMax,
        Min: this.settings.dripMin,
        greenPercent: this.settings.greenPercentDrip,
        redPercent: this.settings.redPercentDrip,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_FR_L
      },
      {
        Max: this.settings.dripSymMax,
        Min: this.settings.dripSymMin,
        greenPercent: this.settings.greenPercentDripSym,
        redPercent: this.settings.redPercentDripSym,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_FR_R
      },
      {
        Max: this.settings.BPMax,
        Min: this.settings.BPMin,
        greenPercent: this.settings.greenPercentBP,
        redPercent: this.settings.redPercentBP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_RE_L
      },
      {
        Max: this.settings.RPMax,
        Min: this.settings.RPMin,
        greenPercent: this.settings.greenPercentRP,
        redPercent: this.settings.redPercentRP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_RE_R
      },
      {
        Max: this.settings.dripSymMax,
        Min: this.settings.dripSymMin,
        greenPercent: this.settings.greenPercentDripSym,
        redPercent: this.settings.redPercentDripSym,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_DripL_Sym,
      },
      {
        Max: this.settings.dripSymMax,
        Min: this.settings.dripSymMin,
        greenPercent: this.settings.greenPercentDripSym,
        redPercent: this.settings.redPercentDripSym,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_DripR_Sym,
      },
      {
        Max: this.settings.BPMax,
        Min: this.settings.BPMin,
        greenPercent: this.settings.greenPercentBP,
        redPercent: this.settings.redPercentBP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_FR_BP,
      },
      {
        Max: this.settings.BPMax,
        Min: this.settings.BPMin,
        greenPercent: this.settings.greenPercentBP,
        redPercent: this.settings.redPercentBP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_RE_BP,
      },
      {
        Max: this.settings.RPMax,
        Min: this.settings.RPMin,
        greenPercent: this.settings.greenPercentRP,
        redPercent: this.settings.redPercentRP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_FR_RP,
      },
      {
        Max: this.settings.RPMax,
        Min: this.settings.RPMin,
        greenPercent: this.settings.greenPercentRP,
        redPercent: this.settings.redPercentRP,
        pointsNum: this.settings.numOfPoints,
        nominal: this.settings.nominal_RE_RP,
      }
    ]

    // this.lineChartBPList = this.lineChartSymDripList;

    // this.lineChartRPList = this.lineChartSymDripList;
  }
}
