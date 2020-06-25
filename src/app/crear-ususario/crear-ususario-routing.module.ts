import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearUsusarioPage } from './crear-ususario.page';

const routes: Routes = [
  {
    path: '',
    component: CrearUsusarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearUsusarioPageRoutingModule {}
