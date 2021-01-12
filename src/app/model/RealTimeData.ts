import { SettingComponent } from './../setting/setting.component';
import { SettingService } from './../service/SettingService';
import axios from 'axios';

export class RealTimeData {
  public numOfParam = 10;
  public numOfPoints;
  public time = [];
  public data = {
    FLD: [],
    FRD: [],
    RLD: [],
    RRD: [],
    b_FRONT: [],
    b_REAR: [],
    b_FL: [],
    b_FR: [],
    b_RL: [],
    b_RR: [],
  };
  public errs = {
    FLD: 0,
    FRD: 0,
    RLD: 0,
    RRD: 0,
    b_FRONT: 0,
    b_REAR: 0,
    b_FL: 0,
    b_FR: 0,
    b_RL: 0,
    b_RR: 0,
  };
  constructor(settingService: SettingService) {
    // this.numOfPoints = settingService.getSettings().numOfPoints;

    // axios.get(`localhost:8080/initialData`, {params: {num: this.numOfPoints}}).then(res=>{
    //   if(res.status==200){
    //     console.log(res.data);
    //   }
    // });
    // for (let i = 0; i < this.numOfPoints; i++) {
    //   this.time.push(0);
    //   Object.keys(this.data).forEach((key) => {
    //     this.data[key].push(0);
    //   });
    // }
    // for (let i = 0; i < this.numOfParam; i++) {
    //   Object.keys(this.errs).forEach((key) => {
    //     this.errs[key] = 0;
    //   });
    // }
  }

  public getData() {
    return this.data;
  }

  public setNewData(data) {
    this.time.push(data.timestamp);
    this.data.FLD.push(data.drip_FL);
    this.data.FRD.push(data.drip_FR);
    this.data.RLD.push(data.drip_RL);
    this.data.RRD.push(data.drip_RR);
    this.data.b_FRONT.push(data.b_FRONT);
    this.data.b_REAR.push(data.b_REAR);
    this.data.b_FL.push(data.b_FL);
    this.data.b_FR.push(data.b_FR);
    this.data.b_RL.push(data.b_RL);
    this.data.b_RR.push(data.b_RR);
    if (this.time.length > this.numOfPoints) {
      this.time.shift();
      Object.keys(this.data).forEach((key) => {
        this.data[key].shift();
      });
    }
  }

  public getErrs() {
    return this.errs;
  }
}

export class StData {
  FLD: Number[];
  FRD: Number[];
  RLD: Number[];
  RRD: Number[];
  FSY: Array<StDataVertical>;
  RSY: Array<StDataVertical>;
  BF: Number[];
  BR: Number[];
  RPLFR: Array<StDataVertical>;
  RPLRE: Array<StDataVertical>;

  constructor(){
    this.FLD = [];
    this.FRD = [];
    this.RLD = [];
    this.RRD = [];
    this.FSY = [];
    this.RSY = [];
    this.BF = [];
    this.BR = [];
    this.RPLFR = [];
    this.RPLRE = [];
  }
};

export class StDataVertical {
  x: number;
  y: Date;

  constructor(data: number, date: Date) {
    this.x = data;
    this.y = date;
  }
}
