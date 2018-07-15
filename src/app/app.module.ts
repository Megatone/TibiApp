import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { CharactersPage } from '../pages/characters/characters';
import { CharacterDetailPage } from '../pages/character-detail/character-detail';
import { HighscoresPage } from '../pages/highscores/highscores';
import { HousesPage } from '../pages/houses/houses';
import { WorldsPage } from '../pages/worlds/worlds';
import { GuildsPage } from '../pages/guilds/guilds';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { StorageProvider } from '../providers/storage/storage';
import { GuildDetailPage } from '../pages/guild-detail/guild-detail';
import { WorldDetailPage } from '../pages/world-detail/world-detail';

@NgModule({
  declarations: [
    MyApp,
    CharactersPage,
    CharacterDetailPage,
    HousesPage,
    WorldsPage,
    HighscoresPage,
    GuildsPage,
    GuildDetailPage,
    WorldDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CharactersPage,
    CharacterDetailPage,
    HousesPage,
    WorldsPage,
    HighscoresPage,
    GuildsPage,
    GuildDetailPage,
    WorldDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    StorageProvider
  ]
})
export class AppModule { }
