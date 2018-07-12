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

  public setCharacter(characterName: string) {
    let characters: Array<string> = JSON.parse(localStorage.getItem('characters'));
    if (characters !== undefined && characters !== null) {
      if (characters.indexOf(characterName) === -1) {
        characters.push(characterName);
      }
    } else {
      characters = [];
      characters.push(characterName);
    }
    localStorage.setItem('characters', JSON.stringify(characters));
  }

  public getIconCharacter(character: any): string {
    let image: string = ''
    switch (character.characters.data.vocation) {
      case 'Knight':
        break;
      case 'Paladin':
        break;
      case 'Sorcerer':
        break;
      case 'Druid':
        break;
      case 'Royal Paladin':
        image = '/assets/imgs/Outfit_Knight_Male_Addon_3.gif';
        break;
      case 'Master Sorcerer':
        break;
      case 'Elite Knight':
        break;
      case 'Elder Druid':
        break;
    }
    return image;
  }
}
