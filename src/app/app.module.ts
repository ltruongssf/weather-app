import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Pages 
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherPage } from '../pages/weather/weather';
//Services
import { GeocodeService } from '../providers/geocode-service';
import { WeatherService } from '../providers/weather-service';
import { LocationsService } from '../providers/locations-service';

const imports = [MyApp, Page1, Page2, LocationsPage, WeatherPage];

@NgModule({
  declarations: imports,
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: imports,
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, WeatherService, GeocodeService, LocationsService]
})
export class AppModule {}
