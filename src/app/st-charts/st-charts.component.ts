import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-st-charts',
  templateUrl: './st-charts.component.html',
  styleUrls: ['./st-charts.component.scss']
})
export class StChartsComponent implements OnInit {

  public data:any;

  constructor(public router:ActivatedRoute) { }

  ngOnInit(): void {
    this.data = JSON.parse(this.router.snapshot.paramMap.get('data'));
    console.log(this.data);
  }

}
