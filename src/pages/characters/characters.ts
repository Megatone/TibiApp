import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

@Component({
  selector: 'characters',
  templateUrl: 'characters.html'
})
export class CharactersPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.getCharacterInformation();
    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CharactersPage, {
      item: item
    });
  }

  public users: any;
  public getCharacterInformation() {
    this.rest.getCharacterInformation('chorizillo enbetunau').then(data => {
      this.users = data;
    });
  }


  public searching: boolean;
  public characterName: string;

  public searchCharacter(event) {
    console.log(event);
  }

}
