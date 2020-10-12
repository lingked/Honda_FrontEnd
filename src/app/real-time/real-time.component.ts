import { SettingService } from './../service/SettingService';
import { SettingComponent } from './../setting/setting.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Subject, Subscription } from 'rxjs';

import { WebSocketAPI } from '../service/WebSocketAPI';

import { Settings } from '../model/Settings';

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
  public lineChartOptionsV:Object;
  // public barChartLabels = [];

  public lineChartLabels = [];

  // public barChartType = 'bar';
  public pieChartType = 'pie';
  public lineChartType = 'line';
  public barChartLegend = true;
  public lineChartLegend = true;
  public data = { FLD: [], FRD: [], RLD: [], RRD: [], FSY:[], RSY:[], BF:[], BR:[], RPLFR:[], RPLRE:[] };
  public dataArray = [];
  public outBoundData = [];

  public lineChartData = [{ data: this.data, label: 'Series A' }];
  public FrontLeftDrip = [{ data: [], label: 'FRONT LEFT' }];
  public FrontRightDrip = [{ data: [], label: 'FRONT RIGHT' }];
  public RearLeftDrip = [{ data: [], label: 'REAR LEFT' }];
  public RearRightDrip = [{ data: [], label: 'REAR RIGHT' }];

  public FLDPie = [0, 0];
  public FRDPie = [0, 0];
  public RLDPie = [0, 0];
  public RRDPie = [0, 0];

  public count_FLD = 0;
  public count_FRD = 0;
  public count_RLD = 0;
  public count_RRD = 0;

  public pieChartLabels = ['normal', 'outbound'];

  public colors = [
    {
      borderColor: 'SlateBlue',
      pointBackgroundColor: 'tomato',
      pointBorderColor: 'tomato',
    },
  ];

  public pieChartColors = [
    {
      backgroundColor: ['blue', 'red'],
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

  constructor(settingService: SettingService, private router: Router) {
    this.settings = settingService.settings;

    console.log(
      Math.ceil((this.settings.dripMax - this.settings.dripMax) / 0.1)
    );

    this.NumOfPoints = this.settings.numOfPoints;
    for (let i = 0; i < this.settings.numOfPoints; i++) {
      this.lineChartLabels.push(0);
      this.data.FLD.push(0);
      this.data.FRD.push(0);
      this.data.RLD.push(0);
      this.data.RRD.push(0);
      this.data.FSY.push(0);
      this.data.RSY.push(0);
      this.data.BF.push(0);
      this.data.BR.push(0);
      this.data.RPLFR.push(0);
      this.data.RPLRE.push(0);
    }

    // Object.keys((this.data) => {
    //   this.dataArray.push(data[])
    // });
  }

  onChangeState = () => {
    console.log('This is operated!');
    this.checked = !this.checked;
  };

  onChangeFLD_er = () => {
    console.log('This is operated!');
    this.FLD_checked_er = !this.FLD_checked_er;
  };

  onChangeFLD_st = () => {
    console.log('This is operated!');
    this.FLD_checked_st = !this.FLD_checked_st;
  };

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
              max: this.settings.dripMax,
              min: this.settings.dripMin,
            },
          },
        ],
      },
    };

    this.lineChartOptionsV = {
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

    this.webSocketAPI = new WebSocketAPI(new AppComponent());
    this.webSocketAPI._connect();
    this.settingSubscription = this.subscription = this.webSocketAPI.message.subscribe(
      (data: any) => {
        this.data.FLD.push(data.drip_FL);
        this.data.FRD.push(data.drip_FR);
        this.data.RLD.push(data.drip_RL);
        this.data.RRD.push(data.drip_RR);
        this.data.FSY.push((data.drip_FL-data.drip_FR).toFixed(3));
        this.data.RSY.push((data.drip_RL-data.drip_RR).toFixed(3));
        this.data.BF.push(data.b_FRONT);
        this.data.BR.push(data.b_REAL);
        this.data.RPLFR.push(data.b_FL-data.b_FR);
        this.data.RPLRE.push(data.b_RL-data.b_RR);
        const upperBound = this.settings.dripUpperBound;
        const lowerBound = this.settings.dripLowerBound;
        if (data.drip_FL > upperBound || data.drip_FL < lowerBound) {
          this.count_FLD++;
        }
        if (data.drip_FR > upperBound) {
          this.count_FRD++;
        }
        if (data.drip_RL > upperBound) {
          this.count_RLD++;
        }
        if (data.drip_RR > upperBound) {
          this.count_RRD++;
        }
        this.lineChartLabels.push(data.timestamp.substring(9));
        if (this.data.FLD.length > this.settings.numOfPoints) {
          if (this.data.FLD[0] > upperBound || data.drip_FL < lowerBound) {
            this.count_FLD--;
          }
          if (this.data.FRD[0] > upperBound) {
            this.count_FRD--;
          }
          if (this.data.RLD[0] > upperBound) {
            this.count_RLD--;
          }
          if (this.data.RRD[0] > upperBound) {
            this.count_RRD--;
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

          this.lineChartLabels.shift();
        }

        this.FrontLeftDrip = [{ data: this.data.FLD, label: 'FRONT LEFT' }];
        this.FrontRightDrip = [{ data: this.data.FRD, label: 'FRONT RIGHT' }];
        this.RearLeftDrip = [{ data: this.data.RLD, label: 'REAR LEFT' }];
        this.RearRightDrip = [{ data: this.data.RRD, label: 'REAR RIGHT' }];
        this.FLDPie = [this.NumOfPoints - this.count_FLD, this.count_FLD];
        this.FRDPie = [this.NumOfPoints - this.count_FRD, this.count_FRD];
        this.RLDPie = [this.NumOfPoints - this.count_RLD, this.count_RLD];
        this.RRDPie = [this.NumOfPoints - this.count_RRD, this.count_RRD];
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
