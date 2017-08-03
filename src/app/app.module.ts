import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdToolbarModule } from '@angular/material';
import * as hc from 'angular2-highcharts';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as highcharts from 'highcharts';

import { gcEventsReducer } from './gc/reducer';
import { GcEventsEffects } from './gc/effects';
import { SourceService } from './gc/source-service';
import { initialState } from './gc/state';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as tokens from './tokens';
import { GcEventsMainComponent } from './gc-events-main.component';
import { GcEventsChartComponent } from './gc-events-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    GcEventsMainComponent,
    GcEventsChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    hc.ChartModule.forRoot(highcharts),

    EffectsModule.forRoot([GcEventsEffects]),
    StoreModule.forRoot({ gc: gcEventsReducer }, { initialState: { gc: initialState }}),
    StoreDevtoolsModule.instrument(),

    MdToolbarModule
  ],
  providers: [
    SourceService,
    { provide: tokens.BrowserWindow, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
