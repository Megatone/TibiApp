import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { CharactersPage } from '../pages/characters/characters';
import { HighscoresPage } from '../pages/highscores/highscores';
import { HousesPage } from '../pages/houses/houses';
import { WorldsPage } from '../pages/worlds/worlds';
import { GuildsPage } from '../pages/guilds/guilds';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CharactersPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Characters', component: CharactersPage },
      { title: 'Guilds', component: GuildsPage },
      { title: 'Worlds', component: WorldsPage },
      { title: 'Highscores', component: HighscoresPage },
      { title: 'Houses', component: HousesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        localStorage.setItem('isApp', '0');
      } else {
        localStorage.setItem('isApp', '1');
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
