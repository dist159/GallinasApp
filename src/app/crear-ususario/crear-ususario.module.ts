import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';


import { CrearUsusarioPageRoutingModule } from './crear-ususario-routing.module';

import { CrearUsusarioPage } from './crear-ususario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearUsusarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearUsusarioPage]
})
export class CrearUsusarioPageModule {}
