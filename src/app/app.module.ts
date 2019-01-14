import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { SimpleTimeseries } from './fusiontime/simple-timeseries';
import { MultiVariate } from './multivariate/multivariate';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries, FusionTheme);

@NgModule({
  declarations: [AppComponent, SimpleTimeseries, MultiVariate],
  imports: [BrowserModule, FusionChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
