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
  public settingService: SettingService;
  constructor(settingService: SettingService) {
    this.settingService = settingService;
    this.settings = settingService.settings;
  }

  ngOnInit(): void {
    this.settingService.getSettings().then( data => 
      this.settings = data
    );
    // this.settings = this.settingService.settings;
  }

  public update(){
    this.settingService.updateSettings(this.settings);
  }
}
