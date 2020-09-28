import { Settings } from '../model/Settings';

export class SettingService {
  public settings: Settings;
  constructor() {
    this.settings = new Settings();
  }
}
