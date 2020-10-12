import { Component, OnInit, Input } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-real-time-item',
  templateUrl: './real-time-item.component.html',
  styleUrls: ['./real-time-item.component.scss'],
})
export class RealTimeItemComponent implements OnInit {
  @Input() itemData: [];
  @Input() labels: [];
  @Input() lineChartOptions: {};
  @Input() lineChartType: String;
  @Input() colors: [];
  @Input() lineChartLegend: [];

  @Input() pieData: [];
  @Input() pieChartLabels: [];
  @Input() pieChartType: String;
  @Input() pieChartColors: [];

  public lineChartPlugins = [pluginAnnotations];
  public pieChecked: boolean = false;
  public settingState: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.lineChartOptions);
  }

  onChangePieState() {
    this.pieChecked = !this.pieChecked;
  }

  onChangeSettingState(){
    this.settingState = !this.settingState;
  }
}
