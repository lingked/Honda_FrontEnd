import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss'],
})
export class ShortTermComponent implements OnInit {
  constructor(public router: Router) {}

  public startDate:any;
  public endDate:any;
  public data=[];

  public Info:any={

    drip:[{
      title:'DRIP_FR_L',
      checked:false,
      exp:'Drip in the front left corner'

    },
    {
      title:'DRIP_FR_R',
      checked:false,
      exp:'Drip in the front right corner'

    },
    {
      title:'DRIP_RE_L',
      checked:false,
      exp:'Drip in the rear left corner'

    },
    {
      title:'DRIP_RE_R',
      checked:false,
      exp:'Drip in the rear right corner'

    }],

    dripsymmatry:[ {
      title:'DRIP_SYMMETRY_FR',
      checked:false,
      exp:'Drip symmetry in the front'

    },
    {
      title:'DRIP_SYMMETRY_RE',
      checked:false,
      exp:'Drip symmetry in the rear'

    }],

    bpitch:[ {
      title:'B-PITCH_FR',
      checked:false,
      exp:'B-Pitch in the front'

    },
    {
      title:'B-PITCH_RE',
      checked:false,
      exp:'B-Pitch in the rear'

    }],

    roofpicklocation:[ {
      title:'ROOF_PICK_LOCATION_FR',
      checked:false,
      exp:'Roof pick location in the front'

    },
    {
      title:'ROOF_PICK_LOCATION_RE',
      checked:false,
      exp:'Roof pick location in the rear'

    },
    {
      title:'Table',
      checked:false,
      exp:'Generate table for all the measurements'

    }
  ],

  }

  ngOnInit(): void {}

  gostcharts(): void{
    let sd = Date.parse(this.startDate);
    let ed = Date.parse(this.endDate);

    this.router.navigate(['stCharts', {startDate:sd, endDate:ed}]);

  //   let NavigationExtras:NavigationExtras = {
  //     queryParams:{
  //       "startdate":sd,"enddate":ed,
  //     "DRIP_FR_L":this.Info.drip[0].checked,
  //     "DRIP_FR_R":this.Info.drip[1].checked,
  //     "DRIP_RE_L":this.Info.drip[2].checked,
  //     "DRIP_RE_R":this.Info.drip[3].checked,
  //     "DRIP_SYMMATRY_FR":this.Info.dripsymmatry[0].checked,
  //     "DRIP_SYMMATRY_RE":this.Info.dripsymmatry[1].checked,
  //     "B_PITCH_FR":this.Info.bpitch[0].checked,
  //     "B_PITCH_RE":this.Info.bpitch[1].checked,
  //     "ROOF_PICK_LOCATION_FR":this.Info.roofpicklocation[0].checked,
  //     "ROOF_PICK_LOCATION_RE":this.Info.roofpicklocation[1].checked,
  //     "Table":this.Info.roofpicklocation[2].checked
  //   }
  //   }

  //   this.router.navigate(['stcharts'],NavigationExtras);
  }
}
