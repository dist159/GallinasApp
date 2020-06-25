import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';


export const firebaseConfig = {
  apiKey: "AIzaSyDHkVZGvFVOpJYL12G8GgBuRvgzBjfwkpE",
  authDomain: "goldenchicken-6d6f4.firebaseapp.com",
  databaseURL: "https://goldenchicken-6d6f4.firebaseio.com",
  projectId: "goldenchicken-6d6f4",
  storageBucket: "goldenchicken-6d6f4.appspot.com",
  messagingSenderId: "964623863933",
  appId: "1:964623863933:web:7efebc6b508edb8802a114",
  measurementId: "G-90KP9LMZRX"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
  }
}
