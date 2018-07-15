import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-highscores',
  templateUrl: 'highscores.html',
})
export class HighscoresPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
