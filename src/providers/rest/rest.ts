import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

  public url: string;
  public realUrl: string = 'https://api.tibiadata.com/v2/';
  public proxyUrl: string = '/api/';

  constructor(
    public http: HttpClient
  ) {
    if (localStorage.getItem('isApp') === '1') {
      this.url = this.realUrl;
    } else {
      this.url = this.proxyUrl;
    }
  }

  public getCharacterInformation(characterName: string) {
    return new Promise(resolve => {
      this.http.get(this.url + 'characters/' + characterName.split(' ').join('+') + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

  public getWorlds() {
    return new Promise(resolve => {
      this.http.get(this.url + 'worlds.json').subscribe(data => {
        resolve(data);
      });
    });
  }

  public getGuildsByWorld(worldName: string) {
    return new Promise(resolve => {
      this.http.get(this.url + 'guilds/' + worldName + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

  public getGuildByName(guildName: string) {
    return new Promise(resolve => {
      this.http.get(this.url + '/guild/' + guildName + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

}
