import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, Refresher } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-character-detail',
  templateUrl: 'character-detail.html',
})
export class CharacterDetailPage {

  @ViewChild(Refresher) refresher: Refresher;
  public character: any = null;
  public characterParam: any = null;
  public isFavorite: boolean = false;
  public loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: StorageProvider,
    private loadingController: LoadingController
  ) {
    this.loadPage()
  }

  public loadPage() {
    this.presentSpinner();
    this.characterParam = this.navParams.data.character;
    this.rest.getCharacterInformation(this.characterParam.Name).then((data: any) => {
      this.character = data;
      this.isFavorite = this.storage.isFavoriteCharacter(this.characterParam.Name);
      this.hideSpinner();
    });
  }

  public favotireChange() {
    this.isFavorite = !this.isFavorite;
    this.storage.setUnsetFavoriteCharacter(this.character.characters.data.name, this.isFavorite);
  }

  public presentSpinner() {
    this.loader = this.loadingController.create();
    this.loader.present();
  }
  public hideSpinner() {
    this.loader.dismiss();
    if (this.refresher) {
      this.refresher.complete();
    }
  }

  public openCharacter(character: any) {
    this.navParams.data.character.Name = character.name;
    this.loadPage();
    this.scrollTop();
  }

  public scrollTop() {
    document.getElementsByClassName('scroll-content')[2].scrollTop = -10000;
  }
}
