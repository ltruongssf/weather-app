import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//Pages
import { LocationsPage } from '../pages/locations/locations';
import { WeatherPage } from '../pages/weather/weather';
//Service
import { WeatherService } from '../providers/weather-service';
import { LocationsService } from '../providers/locations-service';
//Interfaces
import { CurrentLoc } from '../interfaces/current-loc';
import { WeatherLocation } from '../interfaces/weather-location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string, loc?:CurrentLoc}>;

  constructor(
    public platform: Platform,
    public weatherService: WeatherService,
    public locationsService: LocationsService,
    public events: Events
  ) {
    this.initializeApp();
    this.getMyLocations();
    // events.subscribe('locations:updated', (data) => {
    //   this.getMyLocations();
    // });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
      { title: 'Current Location', component: WeatherPage, icon: 'pin' }, 
      { title: 'Cape Canaveral, FL', component: WeatherPage, icon: 'pin',
        loc: {lat:28.3922, lon:-80.6077} },
      { title: 'San Francisco, CA', component: WeatherPage, icon: 'pin',
        loc: {lat:37.7749, lon:-122.4194} },
      { title: 'Vancouver, BC', component: WeatherPage, icon: 'pin',
        loc: {lat:49.2827, lon:-123.1207} },
      { title: 'Madison, WI', component: WeatherPage, icon: 'pin',
        loc: {lat:43.0742365, lon:-89.381011899} }
    ];
  }
  
  getMyLocations(){
    this.locationsService.locations$.subscribe( ( locs: Array<WeatherLocation> ) => {
      this.pages = [
        { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
        { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ];
      for (let newLoc of locs) {
        this.pages.push(newLoc);
      }
    });
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    // this.weatherService.load();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc') ) {
      this.nav.setRoot(page.component, {geoloc: page.loc, title: page.title});
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
