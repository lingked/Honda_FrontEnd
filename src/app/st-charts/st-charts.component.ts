import { SettingService } from './../service/SettingService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import axios from 'axios';

@Component({
  selector: 'app-st-charts',
  templateUrl: './st-charts.component.html',
  styleUrls: ['./st-charts.component.scss']
})
export class StChartsComponent implements OnInit {

  public checks = { FLD: false, FRD: false, RLD: false, RRD: false, FSY:false, RSY:false, BF:false, BR:false, RPLFR:false, RPLRE:false, table:false };
  public checksArr = []
  public labels = []
  public data = { FLD: [], FRD: [], RLD: [], RRD: [], FSY:[], RSY:[], BF:[], BR:[], RPLFR:[], RPLRE:[] };
  public totals = {FLD:0, FRD: 0, RLD: 0, RRD: 0, FSY:0, RSY:0, BF:0, BR:0, RPLFR:0, RPLRE:0};
  public num=0;
  public lineChartOptions:{};
  public settings:any;

  constructor(public router:ActivatedRoute, public settingService: SettingService) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {
    const startDate = this.router.snapshot.paramMap.get('startDate');
    const endDate = this.router.snapshot.paramMap.get('endDate');
    this.checks = JSON.parse(this.router.snapshot.paramMap.get('checks'));
    Object.keys(this.checks).forEach(key =>{
      this.checksArr.push(this.checks[key]);
    });

    const url = `https://honda-api-demo.herokuapp.com`;
    const url2 = 'http://localhost:8080';
    axios.get(url, {params: {startDate:startDate, endDate:endDate}
  }, ).then(res=>{
    if(res.status==200){
      res.data.forEach(item => {
        console.log(item);
        this.labels.push(item.timestamp);

        this.data.FLD.push(+item.drip_FL.toFixed(2));
        this.data.FRD.push(+item.drip_FR.toFixed(2));
        this.data.RLD.push(+item.drip_RL.toFixed(2));
        this.data.RRD.push(+item.drip_RR.toFixed(2));
        this.data.FSY.push(+(item.drip_FL-item.drip_FR).toFixed(2));
        this.data.RSY.push(+(item.drip_RL-item.drip_RR).toFixed(2));
        this.data.BF.push(+item.b_FRONT.toFixed(2));
        this.data.BR.push(+item.b_REAL.toFixed(2));
        this.data.RPLFR.push(+(item.b_FL-item.b_FR).toFixed(2));
        this.data.RPLRE.push(+(item.b_RL-item.b_RR).toFixed(2));

        this.totals.FLD+=(+item.drip_FL.toFixed(2));
        this.totals.FRD+=(+item.drip_FR.toFixed(2));
        this.totals.RLD+=(+item.drip_RL.toFixed(2));
        this.totals.RRD+=(+item.drip_RR.toFixed(2));
        this.totals.FSY+=(+(item.drip_FL-item.drip_FR).toFixed(2));
        this.totals.RSY+=(+(item.drip_RL-item.drip_RR).toFixed(2));
        this.totals.BF+=(+item.b_FRONT.toFixed(2));
        this.totals.BR+=(+item.b_REAL.toFixed(2));
        this.totals.RPLFR+=(+(item.b_FL-item.b_FR).toFixed(2));
        this.totals.RPLRE+=(+(item.b_RL-item.b_RR).toFixed(2));

        this.num++;
      });
    } else{
      return;
    }
  });
  }

}
