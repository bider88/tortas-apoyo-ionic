import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { InfoPage } from '../info/info';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabs = [
    {
      icon: 'home',
      title: 'Inicio',
      page: HomePage
    },
    {
      icon: 'list',
      title: 'Ayuda',
      page: ListPage
    },
    {
      icon: 'information-circle',
      title: 'Boletín',
      page: InfoPage
    },
  ]

}
