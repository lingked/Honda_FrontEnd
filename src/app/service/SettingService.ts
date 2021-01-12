import { Settings } from '../model/Settings';

import axios from 'axios';
import { Urls } from '../config/util';

export class SettingService {
  public settings: Settings;
  public UpdateSettingUrl: string;
  constructor() {
    this.UpdateSettingUrl = Urls.UpdateSettingUrl;
    this.settings = new Settings();
    this.getSettings();
  }

  public async getSettings() {
    
    let updatedSettings;
    await axios.get(Urls.GetSettingUrl).then(res => {
      if(res.status==200){
        updatedSettings = res.data;
        
        if(updatedSettings!=null){
          this.settings = {
            ...updatedSettings, 
            BPMax: updatedSettings.bpMax,
            BPMin: updatedSettings.bpMin,
            RPMax: updatedSettings.rpMax,
            RPMin: updatedSettings.rpMin
          }
        }
      } else{
        
      }
    });

    if (this.settings) {
      return this.settings;
    } else {
      return null;
    }
  }

  public updateSettings(updatedSettings: Settings) {
    axios.post(this.UpdateSettingUrl, {
      ...updatedSettings, 
      bpMax: updatedSettings.BPMax,
      bpMin: updatedSettings.BPMin,
      rpMax: updatedSettings.RPMax,
      rpMin: updatedSettings.RPMin
    }).then(res =>{
      console.log(updatedSettings);
      if(res.status==200){
        console.log("upDated");
      } else {
        
      }
    });
  }
}
