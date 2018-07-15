import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, Refresher, TextInput, Searchbar, Select } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { StorageProvider } from '../../providers/storage/storage';
import { ToastController } from 'ionic-angular';
import { CharacterDetailPage } from '../character-detail/character-detail'

@Component({
  selector: 'characters',
  templateUrl: 'characters.html'
})
export class CharactersPage {

  @ViewChild(Refresher) refresher: Refresher;
  @ViewChild(Searchbar) searchbar: TextInput;
  @ViewChild(Select) select: Select;

  public characterNameSearch: string;
  public loader: Loading;
  public searching: boolean;
  public characterName: string;
  public characters: Array<{
    Name: string,
    Level: number,
    Vocation: string,
    Online: string,
    World: string,
    icon: string
  }> = [];

  public filters: Array<{ name: string }> = [
    { name: 'Name' },
    { name: 'Level' },
    { name: 'World' },
    { name: 'Online' }
  ];

  public filter: string = 'Name';


  constructor(
    private navCtrl: NavController,
    private rest: RestProvider,
    private storage: StorageProvider,
    private toastCtrl: ToastController,
    private loadingController: LoadingController
  ) {
    this.loadPage();
  }

  public loadPage() {
    this.filter = this.storage.getFilter();
    this.characters = [];
    this.loader = this.loadingController.create();
    for (let i = 0; i <= this.storage.getCharacters().length - 1; i++) {
      let characterName = this.storage.getCharacters()[i];
      this.getCharacterInformation(characterName, false);
    }
  }

  public itemTapped(event, character) {
    this.navCtrl.push(CharacterDetailPage, {
      character: character
    });
  }

  public getCharacterInformation(characterName: string, isSearch: boolean) {
    if (characterName !== undefined && characterName !== null && characterName !== '') {
      this.presentSpinner(isSearch);
      this.rest.getCharacterInformation(characterName).then((data: any) => {
        if (data.characters.error === undefined) {
          if (isSearch) {
            this.characters = [];
          }
          this.characters.push({
            Name: data.characters.data.name,
            Level: data.characters.data.level,
            Vocation: data.characters.data.vocation,
            World: data.characters.data.world,
            Online: data.characters.data.status,
            icon: this.storage.getIconCharacter(data)
          });
        } else {
          this.presentToast(data.characters.error);
        }
        this.hideSpinner(isSearch);
      });
    } else {
      this.presentToast('Character name is empty');
    }
  }

  public searchCharacter(event) {
    if (parseInt(event.keyCode) === 13) {
      this.getCharacterInformation(this.characterNameSearch, true);
    }
  }

  public presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public presentSpinner(isSearch: boolean) {
    if (isSearch) {
      this.loader.dismiss();
      this.loader = this.loadingController.create();
      this.loader.present();
    } else {
      this.loader.present();
    }
  }

  public hideSpinner(isSearch: boolean) {
    if (this.characters.length === this.storage.getCharacters().length && isSearch === false) {
      this.loader.dismiss();
      if (this.refresher) {
        this.refresher.complete();
      }
    }
    if (isSearch) {
      this.loader.dismiss();
      if (this.refresher) {
        this.refresher.complete();
      }
    }
    this.characters.sort(this.dynamicSort(this.filter));
  }

  public searchingChange() {
    this.searching = !this.searching;
    this.characterNameSearch = ''
    if (!this.searchbar) {
      setTimeout(() => { this.searchbar.setFocus(); }, 1)
    }
  }

  public selectFilter() {
    if (this.select) {
      this.select.open();
    }
  }

  public onSelectChange(filter: string) {
    this.storage.setFilter(filter);
    this.characters.sort(this.dynamicSort(this.filter));
  }

  private dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return (property === 'Online') ? (result * sortOrder) * -1 : result * sortOrder;
    }
  }
}
