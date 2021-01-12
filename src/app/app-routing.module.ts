import { StChartsComponent } from './st-charts/st-charts.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SettingComponent } from './setting/setting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealTimeComponent } from './real-time/real-time.component';
import { ShortTermComponent } from './short-term/short-term.component';

const routes: Routes = [
  { path: '', component: SettingComponent},
  { path: 'settings', component: SettingComponent },
  { path: 'real-time', component: RealTimeComponent },
  { path: 'short-term', component: ShortTermComponent },
  { path: 'stCharts', component: StChartsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
