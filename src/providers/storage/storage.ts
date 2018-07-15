import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {
  }

  public getCharacters(): Array<string> {
    let characters: Array<string> = JSON.parse(localStorage.getItem('characters'));
    if (characters === undefined || characters === null) {
      characters = [];
    }
    return characters;
  }

  public setUnsetFavoriteCharacter(characterName: string, isFavorite: boolean) {
    let characters: Array<string> = JSON.parse(localStorage.getItem('characters'));
    if (characters !== undefined && characters !== null) {
      if (isFavorite) {
        if (characters.indexOf(characterName) === -1) {
          characters.push(characterName);
        }
      } else {
        if (characters.indexOf(characterName) !== -1) {
          characters = characters.filter(char => char !== characterName);
        }
      }
    } else {
      characters = [];
      if (characters.indexOf(characterName) === -1) {
        characters.push(characterName);
      }
    }
    localStorage.setItem('characters', JSON.stringify(characters));
  }

  public getIconCharacter(character: any): string {
    let image: string = 'https://ionium.es/addons/' + character.characters.data.vocation + '_' + character.characters.data.sex + '.png';
    return image;
  }

  public isFavoriteCharacter(characterName: string): boolean {
    return this.getCharacters().indexOf(characterName) > -1;
  }

  public getFilter() {
    let filter = localStorage.getItem('filter');
    return (filter) ? filter : 'Name';
  }

  public setFilter(filter: string) {
    localStorage.setItem('filter', filter);
  }
}
