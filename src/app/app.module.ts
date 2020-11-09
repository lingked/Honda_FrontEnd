import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { ShortTermComponent } from './short-term/short-term.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SettingComponent } from './setting/setting.component';

import { SettingService } from './service/SettingService';
import { RealTimeChartComponent } from './real-time/real-time-chart/real-time-chart.component';
import { RealTimeItemComponent } from './real-time/real-time-chart/real-time-item/real-time-item.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    RealTimeComponent,
    ShortTermComponent,
    NotFoundPageComponent,
    SettingComponent,
    RealTimeChartComponent,
    RealTimeItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ChartsModule, FormsModule, OwlDateTimeModule,
    OwlNativeDateTimeModule],
  providers: [SettingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
