import { Component, OnInit } from '@angular/core';

import { SettingService } from './../service/SettingService';
import { Settings } from '../model/Settings';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public settings: Settings;
  constructor(settingService: SettingService) {
    this.settings = settingService.settings;
  }

  ngOnInit(): void {}
}
