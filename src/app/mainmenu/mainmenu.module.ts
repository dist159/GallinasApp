import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainmenuPageRoutingModule } from './mainmenu-routing.module';

import { MainmenuPage } from './mainmenu.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainmenuPageRoutingModule,
    NgCircleProgressModule
  ],
  declarations: [MainmenuPage]
})
export class MainmenuPageModule {}
