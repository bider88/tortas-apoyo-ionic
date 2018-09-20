import { FacebookProvider } from './../../providers/facebook/facebook';
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
  alias: string = 'Anónimo';
  quantity: number = 1;
  aliasTemp = '';
  optQuantity: string = 'select';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private fbProvider: FacebookProvider
    ) {
  }

  ionViewDidLoad() {
    // Bloquemos el slide al usuario
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  /* ********************* SLIDE ONE ********************* */

  validOption() {
    const indexPage = this.slides.getActiveIndex();

    switch ( indexPage ) {
      case 0:
        if ( this.option == 0 ) {

          this.next();
          this.alias = 'Anónimo';

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

  insertAlias() {
    this.alertCtrl.create({
      title: 'Ingresar alias',
      message: "Ingresar su alias. Si ya cuenta con uno, favor de ingresarlo para contabilizar a su cuenta el apoyo, de otra manera se creará un nuevo alias.",
      inputs: [
        {
          name: 'alias',
          placeholder: 'Alias'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: data => {
            console.log('Saved clicked', data);
            this.aliasTemp = data.alias;
            this.setAlias();
          }
        }
      ]
    }).present();
  }

  setAlias() {
    const aliasTemp = this.aliasTemp.trim();
    if ( aliasTemp.length > 0 ) {
      const alias = aliasTemp.split(' ');
      this.alias = alias[0];
      this.next();
      return true;
    }

    return false;
  }

  loginWithFacebook() {
    this.fbProvider.signInWithFacebook()
    .then( ( res: any ) => {
      console.log( JSON.stringify( res ) );
      this.alias = res.user.displayName;
      console.log(this.alias);
      this.next();
    })
    .catch( err => console.log( JSON.stringify( err ) ) );
  }

  /* ********************* SLIDE TWO ********************* */
  onChange() {
    const val = Number(this.quantity);

    if ( isNaN ) {

      if (val >= 999) {
        this.quantity = 999;
      } else if ( val <= 1) {
        this.quantity = 1;
      } else {
        this.quantity = val;
      }
    } else {
      this.quantity = 1;
    }

  }

  ionViewCanLeave( ) {
    const indexPage = this.slides.getActiveIndex();

    if ( indexPage < 2 ) {

      return new Promise((resolve, reject) => {

        this.alertCtrl.create({
          subTitle: 'Descartar ayuda',
          message: '¿Estás seguro de descartar la ayuda? ',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Cancelar',
              handler: () => resolve(false)
            },
            {
              text: 'Descartar',
              handler: () => resolve(true)
            }
          ]
        }).present();

      })

    }
  }

  next() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = true;

    this.slides.slideNext();
    window.scrollTo(0, 0);

    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  back() {
    this.slides.lockSwipes(false);
    this.slides.freeMode = true;

    this.slides.slidePrev();
    window.scrollTo(0, 0);

    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  close() {
    this.navCtrl.pop();
  }

  showAlert(subTitle: string = 'Aviso', message: string = '') {
    return this.alertCtrl.create({
      subTitle,
      message
    });
  };
}
