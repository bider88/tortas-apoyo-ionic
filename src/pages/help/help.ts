import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  @ViewChild (Slides) slides: Slides;

  option: number = 0;
  alias: string = '';
  aliasTemp = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    // Bloquemos el slide al usuario
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  validOption() {
    const indexPage = this.slides.getActiveIndex();

    console.log(indexPage);



    switch ( indexPage ) {
      case 0:
        if ( this.option == 0 ) {

          this.next();

        } else {
          if ( this.option == 1 ) {
            if ( this.setAlias() ) {
              this.next();
            } else {
              this.showAlert('Ingrese alias', 'No se ha ingresado ningún alias').present();
            }
          }
        }
      break;
      case 1:
      break;
      case 2:
      break;
    }
  }

  setAlias() {
    const aliasTemp = this.aliasTemp.trim();
    if ( aliasTemp.length > 0 ) {
      this.alias = aliasTemp;
      return true;
    }

    return false;
  }

  next() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = true;

    this.slides.slideNext();

    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  back() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = true;

    this.slides.slidePrev();

    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  showAlert(subTitle: string = 'Aviso', message: string = '') {
    return this.alertCtrl.create({
      subTitle,
      message
    });
  };
}
