import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { WorldDetailPage } from '../world-detail/world-detail';

@Component({
  selector: 'page-worlds',
  templateUrl: 'worlds.html',
})
export class WorldsPage {
  public loader: Loading;
  public worlds: Array<{
    name: string,
    online: string,
    location: string,
    worldType: string,
    additional: string
  }>;
  public world: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    private loadingController: LoadingController
  ) {
    this.loader = this.loadingController.create();
    this.loadPage();
  }

  public loadPage() {
    this.presentSpinner();
    this.rest.getWorlds().then((data: any) => {
      this.worlds = [];
      for (var i = 0; i <= data.worlds.allworlds.length - 1; i++) {
        this.worlds.push({
          name: data.worlds.allworlds[i].name,
          online: data.worlds.allworlds[i].online,
          location: data.worlds.allworlds[i].location,
          worldType: data.worlds.allworlds[i].worldType,
          additional: data.worlds.allworlds[i].additional
        });
      }
      this.hideSpinner();
    });
  }

  public presentSpinner() {
    this.loader.dismiss();
    this.loader = this.loadingController.create();
    this.loader.present();
  }

  public hideSpinner() {
    this.loader.dismiss();
  }

  public openWorld(world: any) {
    this.navCtrl.push(WorldDetailPage, {
      world: world
    });
  }

}
