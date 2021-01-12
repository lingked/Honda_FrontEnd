import { SettingService } from './../service/SettingService';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ChartDataSets, ChartOptions } from 'chart.js';

import axios from 'axios';

import { StData } from '../model/RealTimeData';

@Component({
  selector: 'app-st-charts',
  templateUrl: './st-charts.component.html',
  styleUrls: ['./st-charts.component.scss'],
})
export class StChartsComponent implements OnInit {
  public checks = {
    FLD: false,
    FRD: false,
    RLD: false,
    RRD: false,
    FSY: false,
    RSY: false,
    BF: false,
    BR: false,
    RPLFR: false,
    RPLRE: false,
    table: false,
  };
  public checksArr = [];
  public labels: Array<number> = [];
  public dates: Array<string> = [];
  public transformedLabels = [];
  public data: StData = new StData();
  public csvData = {
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
  public totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public num = 0;
  public lineChartOptions: {};
  public settings: any;

  public ready = false;
  public averages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public symData: ChartDataSets[];
  public testData: [{ x: any; y: any }];

  constructor(
    public router: ActivatedRoute,
    public settingService: SettingService
  ) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {
    const startDate = this.router.snapshot.paramMap.get('startDate');
    const endDate = this.router.snapshot.paramMap.get('endDate');
    this.checks = JSON.parse(this.router.snapshot.paramMap.get('checks'));
    Object.keys(this.checks).forEach((key) => {
      this.checksArr.push(this.checks[key]);
    });

    const url = `https://honda-api-demo.herokuapp.com`;
    const url2 = 'http://localhost:8080';
    axios
      .get(url2, { params: { startDate: startDate, endDate: endDate } })
      .then((res) => {
        let initData: StData = new StData();

        // change time to GMT - 5000
        const dif = 3600 * 1000 * 5;
        if (res.status == 200) {
          // console.log(res.data);
          res.data.forEach((item) => {
            this.labels.push(Date.parse(item.timestamp) + dif);

            initData.FLD.push(+Math.ceil(item.drip_FL*100)/100);
            initData.FRD.push(+Math.ceil(item.drip_FR*100)/100);
            initData.RLD.push(+Math.ceil(item.drip_RL*100)/100);
            initData.RRD.push(+Math.ceil(item.drip_RR*100)/100);
            initData.FSY.push({
              x: +Math.ceil((item.drip_FL - item.drip_FR)*100)/100,
              y: new Date(Date.parse(item.timestamp) + dif),
            });
            this.csvData.FSY.push(+Math.ceil((item.drip_FL - item.drip_FR)*100)/100);
            initData.RSY.push({
              x: +Math.ceil((item.drip_RL - item.drip_RR)*100)/100,
              y: new Date(Date.parse(item.timestamp) + dif),
            });

            this.csvData.RSY.push(+Math.ceil((item.drip_RL - item.drip_RR)*100)/100);
            initData.BF.push(+Math.ceil(item.b_FRONT*100)/100);
            initData.BR.push(+Math.ceil(item.b_REAL*100)/100);
            initData.RPLFR.push({
              x: +Math.ceil((item.b_FL - item.b_FR)*100)/100,
              y: new Date(Date.parse(item.timestamp) + dif),
            });
            this.csvData.RPLFR.push(+Math.ceil((item.b_FL - item.b_FR)*100)/100);
            initData.RPLRE.push({
              x: +Math.ceil((item.b_RL - item.b_RR)*100)/100,
              y: new Date(Date.parse(item.timestamp) + dif),
            });
     
            this.csvData.RPLRE.push(+Math.ceil((item.b_RL - item.b_RR)*100)/100);

            this.totals[0] += +Math.ceil(item.drip_FL*100)/100;
            this.totals[1] += +Math.ceil(item.drip_FR*100)/100;
            this.totals[2] += +Math.ceil(item.drip_RL*100)/100;
            this.totals[3] += +Math.ceil(item.drip_RR*100)/100;
            this.totals[4] += +Math.ceil((item.drip_FL - item.drip_FR)*100)/100;
            this.totals[5] += +Math.ceil((item.drip_RL - item.drip_RR)*100)/100;
            this.totals[6] += +Math.ceil(item.b_FRONT*100)/100;
            this.totals[7] += +Math.ceil(item.b_REAL*100)/100;
            this.totals[8] += +Math.ceil((item.b_FL - item.b_FR)*100)/100;
            this.totals[9] += +Math.ceil((item.b_RL - item.b_RR)*100)/100;

            this.num++;
          });
          
          let i = 0;
          this.totals.forEach(total => {
            this.averages[i] = Math.ceil((total/this.num) * 100)/100;
            i++;
          });

          this.csvData.FLD = initData.FLD;
          this.csvData.FRD = initData.FRD;
          this.csvData.RLD = initData.RLD;
          this.csvData.RRD = initData.RRD;
          this.csvData.BF = initData.BF;
          this.csvData.BR = initData.BR;
          this.ready = true;
        }
        initData = this.transformData(initData, this.labels);


        this.labels.forEach(date => {
          this.dates.push(this.fmtDt(new Date(date)));
        });



        initData.FLD.forEach((dt) => {
          this.data.FLD.push(dt);
        });
        initData.FRD.forEach((dt) => {
          this.data.FRD.push(dt);
        });
        initData.RLD.forEach((dt) => {
          this.data.RLD.push(dt);
        });
        initData.RRD.forEach((dt) => {
          this.data.RRD.push(dt);
        });
        initData.FSY.forEach((dt) => {
          this.data.FSY.push(dt);
        });
        initData.RSY.forEach((dt) => {
          this.data.RSY.push(dt);
        });
        initData.BF.forEach((dt) => {
          this.data.BF.push(dt);
        });
        initData.BR.forEach((dt) => {
          this.data.BR.push(dt);
        });
        initData.RPLFR.forEach((dt) => {
          this.data.RPLFR.push(dt);
        });
        initData.RPLRE.forEach((dt) => {
          this.data.RPLRE.push(dt);
        });

        initData.FSY.forEach((dt) => {
          this.transformedLabels.push(this.fmtDt(new Date(dt.y)));
        });

      });
  }

  transformData = (data: StData, labels: Array<number>) => {
    let transformedData: StData = new StData();
    const Num = data.FLD.length;
    const VALUE_A = 30;
    const VALUE_B = 60;
    const VALUE_C = 500;
    let multipleTimes = 0;
    // data transform

    // Num <= 30, stay where it is
    if (Num <= VALUE_A) {
      // this.labels.forEach(item => {
      //   this.transformedLabels.push(this.fmtDt(new Date(item)))
      // });
      
      return data;
    }
    // 30 < Num <=500, average to 30 points
    else {
      // 30 < Num <=500, average to 30 points
      // Num > 500, average to 60 points
      let VALUE_ADP = Num<=VALUE_C ? VALUE_A: VALUE_B;
      multipleTimes = Math.ceil(Num / VALUE_ADP);

      Object.keys(data).forEach((key) => {
        // value[j] += item[i];
        for (let index = 0; index < VALUE_ADP; index++) {
          let timestamp = 0;
          let value = 0;
          let count = 0;
          for (let i = index * multipleTimes; i < Math.min((index + 1) * multipleTimes, Num); i++) {
            if(key!="FSY"&&key!="RSY"&&key!="RPLFR"&&key!="RPLRE"){
              value += data[key][i];
            } else{
              value += data[key][i].x;
            }
            timestamp += new Date(labels[i]).getTime();
            count++;
          }
          if(count!=0){
            if(key!="FSY"&&key!="RSY"&&key!="RPLFR"&&key!="RPLRE"){
              transformedData[key].push(Math.ceil(value/count*100)/100);
            } else{
              transformedData[key].push({
                x: Math.ceil(value*100/count)/100,
                y: new Date(Math.ceil(timestamp/count))
              })
            }
          }
        }
      });
    }
    return transformedData;
  };

  fmtDt(dt: Date): string {
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const rdt:string = `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getHours()}:${dt.getMinutes()>=10?dt.getMinutes():'0'+dt.getMinutes()}`;
    return rdt;
  }
}
