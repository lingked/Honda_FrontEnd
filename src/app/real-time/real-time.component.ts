import { SettingService } from './../service/SettingService';
import { SettingComponent } from './../setting/setting.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Subject, Subscription } from 'rxjs';
import axios from 'axios';

import { WebSocketAPI } from '../service/WebSocketAPI';

import { Settings } from '../model/Settings';
import { basicLineChartOption } from '../config/chartConfig';
import { StData, StDataVertical } from '../model/RealTimeData';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss'],
})
export class RealTimeComponent implements OnInit {
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  // };

  public lineChartOptions: Object;
  public lineChartOptionsV: Object;
  // public barChartLabels = [];

  public lineChartLabels = [];

  // public barChartType = 'bar';
  public pieChartType = 'pie';
  public lineChartType = ['line', 'line', 'line', 'line', 'scatter', 'scatter', 'line', 'line', 'scatter', 'scatter'];
  public barChartLegend = true;
  public lineChartLegend = true;
  public timestamp = [];
  public data = {
    FLD: [],
    FRD: [],
    RLD: [],
    RRD: [],
    FSY: [],
    RSY: [],
    BF: [],
    BR: [],
    RPLFR: [],
    RPLRE: [],
  };
  public transformedData: StData = new StData();
  public pieData = {
    FLD: [],
    FRD: [],
    RLD: [],
    RRD: [],
    FSY: [],
    RSY: [],
    BF: [],
    BR: [],
    RPLFR: [],
    RPLRE: [],
  };
  public dataArray = [];
  public outBoundData = [];

  public lineChartData = [{ data: this.data, label: 'Series A' }];
  public FrontLeftDrip = [{ data: [], label: 'FRONT LEFT' }];
  public FrontRightDrip = [{ data: [], label: 'FRONT RIGHT' }];
  public RearLeftDrip = [{ data: [], label: 'REAR LEFT' }];
  public RearRightDrip = [{ data: [], label: 'REAR RIGHT' }];

  public FLDPie = [0, 0, 0];
  public FRDPie = [0, 0, 0];
  public RLDPie = [0, 0, 0];
  public RRDPie = [0, 0, 0];

  public count_FLD = 0;
  public count_FRD = 0;
  public count_RLD = 0;
  public count_RRD = 0;

  public pieChartLabels = ['normal', 'outbound', 'error'];

  public errors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public divs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public dif = 3600 * 1000 * 5;

  public colors = [
    {
      borderColor: 'slategrey',
      pointBackgroundColor: 'black',
      pointBorderColor: 'dark',
    },
  ];

  public pieChartColors = [
    {
      backgroundColor: ['green', 'orange', 'red'],
    },
  ];

  public webSocketAPI: WebSocketAPI;

  public subscription: Subscription;

  public settingSubscription: Subscription;

  public NumOfPoints: number;

  public checked = false;
  public FLD_checked_er = false;
  public FLD_checked_st = false;

  public settings: Settings;

  constructor(
    settingService: SettingService,
    webSocketApi: WebSocketAPI,
    private router: Router
  ) {
    this.settings = settingService.settings;
    this.webSocketAPI = webSocketApi;
    // console.log(
    //   Math.ceil((this.settings.dripMax - this.settings.dripMax) / 0.1)
    // );

    this.NumOfPoints = this.settings.numOfPoints;
    const url = `https://honda-api-demo.herokuapp.com/initialData`;
    const url2 = 'http://localhost:8080/initialData';
    axios.get(url2, { params: { num: this.NumOfPoints } }).then((res) => {
      if (res.status == 200) {
        res.data.forEach((item) => {
          const ts = Date.parse(item.timestamp) + this.dif;
          const dt = new Date(ts);
          // console.log(item.timestamp);
          // console.log(new Date(ts));
          this.timestamp.push(item.timestamp);
          // let t = item.timestamp.split(/[- :]/);
          // this.lineChartLabels.push(t[3] + ':' + t[4] + ':' + parseInt(t[5]));
          this.lineChartLabels.push(dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds());
          this.data.FLD.push(+item.drip_FL.toFixed(2));
          this.data.FRD.push(+item.drip_FR.toFixed(2));
          this.data.RLD.push(+item.drip_RL.toFixed(2));
          this.data.RRD.push(+item.drip_RR.toFixed(2));
          this.data.FSY.push(+(item.drip_FL - item.drip_FR).toFixed(2));
          this.data.RSY.push(+(item.drip_RL - item.drip_RR).toFixed(2));
          this.data.BF.push(+item.b_FRONT.toFixed(2));
          this.data.BR.push(+item.b_REAL.toFixed(2));
          this.data.RPLFR.push(+(item.b_FL - item.b_FR).toFixed(2));
          this.data.RPLRE.push(+(item.b_RL - item.b_RR).toFixed(2));

          this.transformedData.FLD.push(Math.ceil(+item.drip_FL*100)/100);
          this.transformedData.FRD.push(Math.ceil(+item.drip_FL*100)/100);
          this.transformedData.RLD.push(Math.ceil(+item.drip_FL*100)/100);
          this.transformedData.RRD.push(Math.ceil(+item.drip_FL*100)/100);
          
          this.transformedData.FSY.push(this.transformData(Math.ceil((item.drip_FL - item.drip_FR)*100)/100, dt));
          this.transformedData.RSY.push(this.transformData(Math.ceil((item.drip_RL - item.drip_RR)*100)/100, dt));

          this.transformedData.BF.push(Math.ceil(+item.drip_FL*100)/100);
          this.transformedData.BR.push(Math.ceil(+item.drip_FL*100)/100);

          this.transformedData.RPLFR.push(this.transformData(Math.ceil((item.b_FL - item.b_FR)*100)/100, dt));
          this.transformedData.RPLRE.push(this.transformData(Math.ceil((item.b_RL - item.b_RR)*100)/100, dt));

          // this.transformedData = {
          //   ...this.data,
          //   FSY: this.transformData(this.data.FSY, this.timestamp),
          //   RSY: this.transformData(this.data.RSY, this.timestamp),
          //   RPLFR: this.transformData(this.data.RPLFR, this.timestamp),
          //   RPLRE: this.transformData(this.data.RPLRE, this.timestamp),
          // };

          if (
            item.drip_FL > this.settings.dripMax ||
            item.drip_FL < this.settings.dripMin
          ) {
            this.errors[0]++;
          }
          if (
            item.drip_FR > this.settings.dripMax ||
            item.drip_FR < this.settings.dripMin
          ) {
            this.errors[1]++;
          }
          if (
            item.drip_RL > this.settings.dripMax ||
            item.drip_RL < this.settings.dripMin
          ) {
            this.errors[2]++;
          }
          if (
            item.drip_RR > this.settings.dripMax ||
            item.drip_RR < this.settings.dripMin
          ) {
            this.errors[3]++;
          }

          if (
            item.drip_FL - item.drip_FR > this.settings.dripSymMax ||
            item.drip_FL - item.drip_FR < this.settings.dripSymMin
          ) {
            this.errors[4]++;
          }
          if (
            item.drip_RL - item.drip_RR > this.settings.dripSymMax ||
            item.drip_RL - item.drip_RR < this.settings.dripSymMin
          ) {
            this.errors[5]++;
          }

          if (
            item.b_FRONT > this.settings.BPMax ||
            item.b_FRONT < this.settings.BPMin
          ) {
            this.errors[6]++;
          }
          if (
            item.b_REAL > this.settings.BPMax ||
            item.b_REAL < this.settings.BPMin
          ) {
            this.errors[7]++;
          }
          if (
            item.b_FL - item.b_FR > this.settings.RPMax ||
            item.b_FL - item.b_FR < this.settings.RPMin
          ) {
            this.errors[8]++;
          }
          if (
            item.b_RL - item.b_RR > this.settings.RPMax ||
            item.b_RL - item.b_RR < this.settings.RPMin
          ) {
            this.errors[9]++;
          }

          if (
            (item.drip_FL <= this.settings.dripMax &&
              item.drip_FL >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (item.drip_FL >= this.settings.dripMin &&
              item.drip_FL <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[0]++;
          }
          if (
            (item.drip_FR <= this.settings.dripMax &&
              item.drip_FR >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (item.drip_FR >= this.settings.dripMin &&
              item.drip_FR <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[1]++;
          }
          if (
            (item.drip_RL <= this.settings.dripMax &&
              item.drip_RL >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (item.drip_RL >= this.settings.dripMin &&
              item.drip_RL <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[2]++;
          }
          if (
            (item.drip_RR <= this.settings.dripMax &&
              item.drip_RR >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (item.drip_RR >= this.settings.dripMin &&
              item.drip_RR <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[3]++;
          }

          if (
            (item.drip_FL - item.drip_FR <= this.settings.dripSymMax &&
              item.drip_FL - item.drip_FR >
                (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                  100) ||
            (item.drip_FL - item.drip_FR >= this.settings.dripSymMin &&
              item.drip_FL - item.drip_FR <
                (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                  100)
          ) {
            this.divs[4]++;
          }

          if (
            (item.drip_RL - item.drip_RR <= this.settings.dripSymMax &&
              item.drip_RL - item.drip_RR >
                (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                  100) ||
            (item.drip_RL - item.drip_RR >= this.settings.dripSymMin &&
              item.drip_RL - item.drip_RR <
                (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                  100)
          ) {
            this.divs[5]++;
          }

          if (
            (item.b_FRONT <= this.settings.BPMax &&
              item.b_FRONT >=
                (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
            (item.b_FRONT >= this.settings.BPMin &&
              item.b_FRONT <=
                (this.settings.BPMin * this.settings.greenPercentBP) / 100)
          ) {
            this.divs[6]++;
          }

          if (
            (item.b_REAL <= this.settings.BPMax &&
              item.b_REAL >=
                (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
            (item.b_REAL >= this.settings.BPMin &&
              item.b_REAL <=
                (this.settings.BPMin * this.settings.greenPercentBP) / 100)
          ) {
            this.divs[7]++;
          }

          if (
            (item.b_FL - item.b_FR <= this.settings.RPMax &&
              item.b_FL - item.b_FR >=
                (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
            (item.b_FL - item.b_FR >= this.settings.RPMin &&
              item.b_FL - item.b_FR <=
                (this.settings.RPMin * this.settings.greenPercentRP) / 100)
          ) {
            this.divs[8]++;
          }

          if (
            (item.b_RL - item.b_RR <= this.settings.RPMax &&
              item.b_RL - item.b_RR >=
                (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
            (item.b_RL - item.b_RR >= this.settings.RPMin &&
              item.b_RL - item.b_RR <=
                (this.settings.RPMin * this.settings.greenPercentRP) / 100)
          ) {
            this.divs[9]++;
          }
        });
        const keys = Object.keys(this.pieData);

        for (let i = 0; i < keys.length; i++) {
          this.pieData[keys[i]] = [
            this.NumOfPoints - this.errors[i] - this.divs[i],
            this.divs[i],
            this.errors[i],
          ];
        }
      }
      console.log(this.transformedData);
      // this.transformedData = {
      //   ...this.data,
      //   FSY: this.transformData(this.data.FSY, this.timestamp),
      //   RSY: this.transformData(this.data.RSY, this.timestamp),
      //   RPLFR: this.transformData(this.data.RPLFR, this.timestamp),
      //   RPLRE: this.transformData(this.data.RPLRE, this.timestamp),
      // };
    });

    Object.keys(this.pieData).forEach((key) => {
      this.pieData[key] = [this.settings.numOfPoints, 0, 0];
    });

    // Object.keys((this.data) => {
    //   this.dataArray.push(data[])
    // });
  }

  // transformData(data: any, timestamp: any): Array<StDataVertical> {
  //   const res: Array<StDataVertical> = new Array<StDataVertical>();
  //   const Num = timestamp.length;
  //   for (let i = 0; i < Num; i++) {
  //     res.push(new StDataVertical(data[i], timestamp[i]));
  //   }
  //   return res;
  // }

  transformData(data: any, timestamp: any): StDataVertical {
    const res: StDataVertical = new StDataVertical(data, timestamp);
    return res;
  }

  onChangeState = () => {
    // console.log('This is operated!');
    this.checked = !this.checked;
  };

  onChangeFLD_er = () => {
    // console.log('This is operated!');
    this.FLD_checked_er = !this.FLD_checked_er;
  };

  onChangeFLD_st = () => {
    // console.log('This is operated!');
    this.FLD_checked_st = !this.FLD_checked_st;
  };

  ngOnInit(): void {
    this.lineChartOptions = new basicLineChartOption();
    // {
    //   backgoundColor: ['dark'],
    //   responsive: true,
    //   animation: false,
    //   elements: {
    //     line: {
    //       tension: 0,
    //       fill: false,
    //       borderWidth: 1,
    //       borderColor: 'red',
    //       backgroundColor: 'red'
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

    this.lineChartOptionsV = {
      backgoundColor: ['dark'],
      responsive: true,
      animation: false,
      elements: {
        line: {
          tension: 0,
          fill: false,
          borderWidth: 1,
          color: 'darkgray',
        },
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              autoSkip: false,
              // maxRotation: 90,
              // minRotation: 90,
              steps: 10,
              stepValue: 0.1,
              max: this.settings.dripSymMax,
              min: this.settings.dripSymMin,
            },
          },
        ],
        xAxes: [
          {
            display: true,
            ticks: {
              autoSkip: false,
              // maxRotation: 90,
              // minRotation: 90,
              type: 'time',
              time: {
                unit: 'minute',
              },
            },
          },
        ],
      },
    };

    // this.webSocketAPI = new WebSocketAPI(new AppComponent());
    // this.webSocketAPI._connect();
    this.settingSubscription = this.subscription = this.webSocketAPI.message.subscribe(
      (data: any) => {
        this.data.FLD.push(data.drip_FL);
        this.data.FRD.push(data.drip_FR);
        this.data.RLD.push(data.drip_RL);
        this.data.RRD.push(data.drip_RR);
        this.data.FSY.push(data.drip_FL - data.drip_FR);
        this.data.RSY.push(data.drip_RL - data.drip_RR);
        this.data.BF.push(data.b_FRONT);
        this.data.BR.push(data.b_REAL);
        this.data.RPLFR.push(data.b_FL - data.b_FR);
        this.data.RPLRE.push(data.b_RL - data.b_RR);

        this.transformedData.FLD.push(data.drip_FL);
        this.transformedData.FRD.push(data.drip_FR);
        this.transformedData.RLD.push(data.drip_RL);
        this.transformedData.RRD.push(data.drip_RR);
        this.transformedData.FSY.push(new StDataVertical(Math.ceil((data.drip_FL - data.drip_FR)*100)/100, data.timestamp));
        this.transformedData.RSY.push(new StDataVertical(Math.ceil((data.drip_RL - data.drip_RR)*100)/100, data.timestamp));
        this.transformedData.BF.push(data.b_FRONT);
        this.transformedData.BR.push(data.b_REAL);
        this.transformedData.RPLFR.push(new StDataVertical(Math.ceil((data.b_FL - data.b_FR)*100)/100, data.timestamp));
        this.transformedData.RPLRE.push(new StDataVertical(Math.ceil((data.b_RL - data.b_RR)*100)/100, data.timestamp));


        if (
          data.drip_FL > this.settings.dripMax ||
          data.drip_FL < this.settings.dripMin
        ) {
          this.errors[0]++;
        }
        if (
          data.drip_FR > this.settings.dripMax ||
          data.drip_FR < this.settings.dripMin
        ) {
          this.errors[1]++;
        }
        if (
          data.drip_RL > this.settings.dripMax ||
          data.drip_RL < this.settings.dripMin
        ) {
          this.errors[2]++;
        }
        if (
          data.drip_RR > this.settings.dripMax ||
          data.drip_RR < this.settings.dripMin
        ) {
          this.errors[3]++;
        }

        if (
          data.drip_FL - data.drip_FR > this.settings.dripSymMax ||
          data.drip_FL - data.drip_FR < this.settings.dripSymMin
        ) {
          this.errors[4]++;
        }
        if (
          data.drip_RL - data.drip_RR > this.settings.dripSymMax ||
          data.drip_RL - data.drip_RR < this.settings.dripSymMin
        ) {
          this.errors[5]++;
        }

        if (
          data.b_FRONT > this.settings.BPMax ||
          data.b_FRONT < this.settings.BPMin
        ) {
          this.errors[6]++;
        }
        if (
          data.b_REAL > this.settings.BPMax ||
          data.b_REAL < this.settings.BPMin
        ) {
          this.errors[7]++;
        }
        if (
          data.b_FL - data.b_FR > this.settings.RPMax ||
          data.b_FL - data.b_FR < this.settings.RPMin
        ) {
          this.errors[8]++;
        }
        if (
          data.b_RL - data.b_RR > this.settings.RPMax ||
          data.b_RL - data.b_RR < this.settings.RPMin
        ) {
          this.errors[9]++;
        }

        if (
          (data.drip_FL <= this.settings.dripMax &&
            data.drip_FL >
              (this.settings.dripMax * this.settings.greenPercentDrip) / 100) ||
          (data.drip_FL >= this.settings.dripMin &&
            data.drip_FL <
              (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
        ) {
          this.divs[0]++;
        }
        if (
          (data.drip_FR <= this.settings.dripMax &&
            data.drip_FR >
              (this.settings.dripMax * this.settings.greenPercentDrip) / 100) ||
          (data.drip_FR >= this.settings.dripMin &&
            data.drip_FR <
              (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
        ) {
          this.divs[1]++;
        }
        if (
          (data.drip_RL <= this.settings.dripMax &&
            data.drip_RL >
              (this.settings.dripMax * this.settings.greenPercentDrip) / 100) ||
          (data.drip_RL >= this.settings.dripMin &&
            data.drip_RL <
              (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
        ) {
          this.divs[2]++;
        }
        if (
          (data.drip_RR <= this.settings.dripMax &&
            data.drip_RR >
              (this.settings.dripMax * this.settings.greenPercentDrip) / 100) ||
          (data.drip_RR >= this.settings.dripMin &&
            data.drip_RR <
              (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
        ) {
          this.divs[3]++;
        }

        if (
          (data.drip_FL - data.drip_FR <= this.settings.dripSymMax &&
            data.drip_FL - data.drip_FR >
              (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                100) ||
          (data.drip_FL - data.drip_FR >= this.settings.dripSymMin &&
            data.drip_FL - data.drip_FR <
              (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                100)
        ) {
          this.divs[4]++;
        }

        if (
          (data.drip_RL - data.drip_RR <= this.settings.dripSymMax &&
            data.drip_RL - data.drip_RR >
              (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                100) ||
          (data.drip_RL - data.drip_RR >= this.settings.dripSymMin &&
            data.drip_RL - data.drip_RR <
              (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                100)
        ) {
          this.divs[5]++;
        }

        if (
          (data.b_FRONT <= this.settings.BPMax &&
            data.b_FRONT >=
              (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
          (data.b_FRONT >= this.settings.BPMin &&
            data.b_FRONT <=
              (this.settings.BPMin * this.settings.greenPercentBP) / 100)
        ) {
          this.divs[6]++;
        }

        if (
          (data.b_REAL <= this.settings.BPMax &&
            data.b_REAL >=
              (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
          (data.b_REAL >= this.settings.BPMin &&
            data.b_REAL <=
              (this.settings.BPMin * this.settings.greenPercentBP) / 100)
        ) {
          this.divs[7]++;
        }

        if (
          (data.b_FL - data.b_FR <= this.settings.RPMax &&
            data.b_FL - data.b_FR >=
              (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
          (data.b_FL - data.b_FR >= this.settings.RPMin &&
            data.b_FL - data.b_FR <=
              (this.settings.RPMin * this.settings.greenPercentRP) / 100)
        ) {
          this.divs[8]++;
        }

        if (
          (data.b_RL - data.b_RR <= this.settings.RPMax &&
            data.b_RL - data.b_RR >=
              (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
          (data.b_RL - data.b_RR >= this.settings.RPMin &&
            data.b_RL - data.b_RR <=
              (this.settings.RPMin * this.settings.greenPercentRP) / 100)
        ) {
          this.divs[9]++;
        }

        let t = data.timestamp.split(/[- :]/);
        this.lineChartLabels.push(t[3] + ':' + t[4] + ':' + parseInt(t[5]));
        this.timestamp.push(data.timestamp);
        // console.log(t[3]+':'+t[4]+':'+parseInt(t[5]));
        if (this.data.FLD.length > this.settings.numOfPoints) {
          // if (this.data.FLD[0] > upperBound || data.drip_FL < lowerBound) {
          //   this.count_FLD--;
          // }
          // if (this.data.FRD[0] > upperBound) {
          //   this.count_FRD--;
          // }
          // if (this.data.RLD[0] > upperBound) {
          //   this.count_RLD--;
          // }
          // if (this.data.RRD[0] > upperBound) {
          //   this.count_RRD--;
          // }
          if (
            this.data.FLD[0] > this.settings.dripMax ||
            this.data.FLD[0] < this.settings.dripMin
          ) {
            this.errors[0]--;
          }
          if (
            this.data.FRD[0] > this.settings.dripMax ||
            this.data.FRD[0] < this.settings.dripMin
          ) {
            this.errors[1]--;
          }
          if (
            this.data.RLD[0] > this.settings.dripMax ||
            this.data.RLD[0] < this.settings.dripMin
          ) {
            this.errors[2]--;
          }
          if (
            this.data.RRD[0] > this.settings.dripMax ||
            this.data.RRD[0] < this.settings.dripMin
          ) {
            this.errors[3]--;
          }

          if (
            this.data.FSY[0] > this.settings.dripSymMax ||
            this.data.FSY[0] < this.settings.dripSymMin
          ) {
            this.errors[4]--;
          }
          if (
            this.data.RSY[0] > this.settings.dripSymMax ||
            this.data.RSY[0] < this.settings.dripSymMin
          ) {
            this.errors[5]--;
          }

          if (
            this.data.BF[0] > this.settings.BPMax ||
            this.data.BF[0] < this.settings.BPMin
          ) {
            this.errors[6]--;
          }
          if (
            this.data.BR[0] > this.settings.BPMax ||
            this.data.BR[0] < this.settings.BPMin
          ) {
            this.errors[7]--;
          }
          if (
            this.data.RPLFR[0] > this.settings.RPMax ||
            this.data.RPLFR[0] < this.settings.RPMin
          ) {
            this.errors[8]--;
          }
          if (
            this.data.RPLRE[0] > this.settings.RPMax ||
            this.data.RPLRE[0] < this.settings.RPMin
          ) {
            this.errors[9]--;
          }

          if (
            (this.data.FLD[0] <= this.settings.dripMax &&
              this.data.FLD[0] >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (this.data.FLD[0] >= this.settings.dripMin &&
              this.data.FLD[0] <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[0]--;
          }
          if (
            (this.data.FRD[0] <= this.settings.dripMax &&
              this.data.FRD[0] >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (this.data.FRD[0] >= this.settings.dripMin &&
              this.data.FRD[0] <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[1]--;
          }
          if (
            (this.data.RLD[0] <= this.settings.dripMax &&
              this.data.RLD[0] >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (this.data.RLD[0] >= this.settings.dripMin &&
              this.data.RLD[0] <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[2]--;
          }
          if (
            (this.data.RRD[0] <= this.settings.dripMax &&
              this.data.RRD[0] >
                (this.settings.dripMax * this.settings.greenPercentDrip) /
                  100) ||
            (this.data.RRD[0] >= this.settings.dripMin &&
              this.data.RRD[0] <
                (this.settings.dripMin * this.settings.greenPercentDrip) / 100)
          ) {
            this.divs[3]--;
          }
          this.data.FSY[0];

          if (
            (this.data.FSY[0] <= this.settings.dripSymMax &&
              this.data.FSY[0] >
                (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                  100) ||
            (this.data.FSY[0] >= this.settings.dripSymMin &&
              this.data.FSY[0] <
                (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                  100)
          ) {
            this.divs[4]--;
          }
          if (
            (this.data.RSY[0] <= this.settings.dripSymMax &&
              this.data.RSY[0] >
                (this.settings.dripSymMax * this.settings.greenPercentDripSym) /
                  100) ||
            (this.data.RSY[0] >= this.settings.dripSymMin &&
              this.data.RSY[0] <
                (this.settings.dripSymMin * this.settings.greenPercentDripSym) /
                  100)
          ) {
            this.divs[5]--;
          }

          if (
            (this.data.BF[0] <= this.settings.BPMax &&
              this.data.BF[0] >=
                (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
            (this.data.BF[0] >= this.settings.BPMin &&
              this.data.BF[0] <=
                (this.settings.BPMin * this.settings.greenPercentBP) / 100)
          ) {
            this.divs[6]--;
          }

          if (
            (this.data.BR[0] <= this.settings.BPMax &&
              this.data.BR[0] >=
                (this.settings.BPMax * this.settings.greenPercentBP) / 100) ||
            (this.data.BR[0] >= this.settings.BPMin &&
              this.data.BR[0] <=
                (this.settings.BPMin * this.settings.greenPercentBP) / 100)
          ) {
            this.divs[7]--;
          }
          if (
            (this.data.RPLFR[0] <= this.settings.RPMax &&
              this.data.RPLFR[0] >=
                (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
            (this.data.RPLFR[0] >= this.settings.RPMin &&
              this.data.RPLFR[0] <=
                (this.settings.RPMin * this.settings.greenPercentRP) / 100)
          ) {
            this.divs[8]--;
          }
          if (
            (this.data.RPLRE[0] <= this.settings.RPMax &&
              this.data.RPLRE[0] >=
                (this.settings.RPMax * this.settings.greenPercentRP) / 100) ||
            (this.data.RPLRE[0] >= this.settings.RPMin &&
              this.data.RPLRE[0] <=
                (this.settings.RPMin * this.settings.greenPercentRP) / 100)
          ) {
            this.divs[9]--;
          }

          this.data.FLD.shift();
          this.data.FRD.shift();
          this.data.RLD.shift();
          this.data.RRD.shift();
          this.data.FSY.shift();
          this.data.RSY.shift();
          this.data.BF.shift();
          this.data.BR.shift();
          this.data.RPLFR.shift();
          this.data.RPLRE.shift();

          this.transformedData.FLD.shift();  
          this.transformedData.FRD.shift(); 
          this.transformedData.RLD.shift(); 
          this.transformedData.RRD.shift(); 
          this.transformedData.FSY.shift();
          this.transformedData.RSY.shift();
          this.transformedData.BF.shift(); 
          this.transformedData.BR.shift(); 
          this.transformedData.RPLFR.shift();
          this.transformedData.RPLRE.shift();

          this.lineChartLabels.shift();
          this.timestamp.shift();
          console.log(this.transformedData);
        }

        // this.FrontLeftDrip = [{ data: this.data.FLD, label: 'FRONT LEFT' }];
        // this.FrontRightDrip = [{ data: this.data.FRD, label: 'FRONT RIGHT' }];
        // this.RearLeftDrip = [{ data: this.data.RLD, label: 'REAR LEFT' }];
        // this.RearRightDrip = [{ data: this.data.RRD, label: 'REAR RIGHT' }];
        // this.FLDPie = [this.NumOfPoints - this.errors[0] - this.divs[0], this.divs[0], this.errors[0]];
        // this.FRDPie = [this.NumOfPoints - this.count_FRD, this.count_FRD];
        // this.RLDPie = [this.NumOfPoints - this.count_RLD, this.count_RLD];
        // this.RRDPie = [this.NumOfPoints - this.count_RRD, this.count_RRD];

        const keys = Object.keys(this.pieData);

        for (let i = 0; i < keys.length; i++) {
          this.pieData[keys[i]] = [
            this.NumOfPoints - this.errors[i] - this.divs[i],
            this.divs[i],
            this.errors[i],
          ];
        }
      }
    );
  }

  navToSettings() {
    this.router.navigate(['/settings']);
  }

  ngOnDestroy(): void {
    this.webSocketAPI._disconnect();
  }
}
