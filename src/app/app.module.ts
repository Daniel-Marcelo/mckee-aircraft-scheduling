import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AircraftSchedulingModule } from './aircraft-scheduling/aircraft-scheduling.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AircraftSchedulingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
