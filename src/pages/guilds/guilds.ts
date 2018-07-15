import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, Select } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { RestProvider } from '../../providers/rest/rest';
import { GuildDetailPage } from '../guild-detail/guild-detail';

@Component({
  selector: 'page-guilds',
  templateUrl: 'guilds.html',
})
export class GuildsPage {
  @ViewChild(Select) select: Select;
  public world: string = 'Antica';
  public worlds: Array<{ name: string, online: string, location: string, worldType: string, additional: string }>;
  public guilds: Array<{ name: string, desc: string, guildlogo: string }>;
  public loader: Loading;
  public filters: Array<{ name: string }> = [
    { name: 'Name' },
    { name: 'Level' },
    { name: 'World' },
    { name: 'Online' }
  ];

  public filter: string = 'Name';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: StorageProvider,
    private rest: RestProvider,
    private loadingController: LoadingController
  ) {
    this.loader = this.loadingController.create();
    this.loadPage();
  }


  public presentSpinner() {
    this.loader.dismiss();
    this.loader = this.loadingController.create();
    this.loader.present();
  }

  public hideSpinner() {
    this.loader.dismiss();
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
      this.getGuilds();
    });
  }

  public getGuilds() {
    this.rest.getGuildsByWorld(this.world).then((data: any) => {
      this.guilds = [];
      for (var i = 0; i <= data.guilds.active.length - 1; i++) {
        this.guilds.push({
          name: data.guilds.active[i].name,
          desc: data.guilds.active[i].desc,
          guildlogo: data.guilds.active[i].guildlogo
        });
      }
      this.hideSpinner();
    });
  }

  public onSelectChangeWordl(event) {
    this.presentSpinner();
    this.getGuilds();
  }

  public onSelectChangeFilter(event) {

  }

  public openGuild(guild: any) {
    this.navCtrl.push(GuildDetailPage, {
      guild: guild
    });
  }

  public selectFilter() {
    if (this.select) {
      this.select.open();
    }
  }

}
