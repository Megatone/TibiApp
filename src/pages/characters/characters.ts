import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'characters',
  templateUrl: 'characters.html'
})
export class CharactersPage {
  public selectedItem: any;
  public characters: Array<{
    name: string,
    level: number,
    vocation: string,
    icon: string
  }> = [];

  public characterNameSearch: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: StorageProvider
  ) {
    for (let i = 0; i <= this.storage.getCharacters().length - 1; i++) {
      let characterName = this.storage.getCharacters()[i];
      this.getCharacterInformation(characterName);
    }

    this.selectedItem = navParams.get('item');
  }

  public itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CharactersPage, {
      item: item
    });
  }

  public searching: boolean;
  public characterName: string;

  public getCharacterInformation(characterName: string) {
    this.rest.getCharacterInformation(characterName).then((data: any) => {
      this.characters.push({
        name: data.characters.data.name,
        level: data.characters.data.level,
        vocation: data.characters.data.vocation,
        icon: this.storage.getIconCharacter(data)
      })
    });
  }


  public searchCharacter(event) {
    if (event.keyCode === 13) {
      this.characters = [];
      this.getCharacterInformation(this.characterNameSearch);
    }
  }

}
