import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './../config/config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { InfoPage } from '../pages/info/info';
import { HelpPage } from '../pages/help/help';
import { HelpProvider } from '../providers/help/help';
import { FacebookProvider } from '../providers/facebook/facebook';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    InfoPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    InfoPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    HelpProvider,
    FacebookProvider
  ]
})
export class AppModule {}
