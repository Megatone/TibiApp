import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

  public local: Storage;

  constructor(public http: HttpClient) {
    //this.local = new Storage();
  }

  public getCharactersFromLocalStorage() {
    this.local.get('characters');
  }


  public setCharacterToLocalStorage() {
    this.local.set('characters', '');
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
