import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) { 
  }

  public getCharacterInformation(characterName: string) {
    return new Promise(resolve => {
      this.http.get('/api/characters/' + characterName.split(' ').join('+') + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

  public getGuildsByWorld(worldName: string) {
    return new Promise(resolve => {
      this.http.get('api/guilds/' + worldName + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

  public getGuildByName(guildName: string) {
    return new Promise(resolve => {
      this.http.get('api/guild/' + guildName + '.json').subscribe(data => {
        resolve(data);
      });
    });
  }

}
