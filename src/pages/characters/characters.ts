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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: StorageProvider
  ) {
    for (let i = 0; i <= this.storage.getCharacters().length - 1; i++) {
      let characterName = this.storage.getCharacters()[i];
      this.rest.getCharacterInformation(characterName).then(data => {
        this.characters.push({
          name: data.characters.data.name,
          level: data.characters.data.level,
          vocation: data.characters.data.vocation,
          icon: this.storage.getIconCharacter(data)
        })
      });
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

  public searchCharacter(event) {
    console.log(event);
    this.rest.setCharacterToLocalStorage();
  }

}
