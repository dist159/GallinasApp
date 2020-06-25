import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ServiciosGService } from './servicios-g.service';
import { IonicStorageModule } from '@ionic/storage';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [IonicStorageModule.forRoot(),BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,NgCircleProgressModule.forRoot({
			// set defaults here
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
		})],
  providers: [ServiciosGService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {}

