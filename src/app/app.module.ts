import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { gcEventsReducer } from './gc/reducer';
import { GcEventsEffects } from './gc/effects';
import { SourceService } from './gc/source-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as tokens from './tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([GcEventsEffects]),
    StoreModule.forRoot({ events: gcEventsReducer }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    SourceService,
    { provide: tokens.BrowserWindow, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
