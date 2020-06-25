/* crear-ususario.page ********************************************************/
/*                                                                            */
/*                   Pagina crear-ususario (funciones)                        */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina crear-ususario. Esta 
                     pagina permite crear un nuevo usuario y guardarlo en el 
                     servidor.
                    

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiciosGService } from '../servicios-g.service';

@Component({
  selector: 'app-crear-ususario',
  templateUrl: './crear-ususario.page.html',
  styleUrls: ['./crear-ususario.page.scss'],
})
export class CrearUsusarioPage implements OnInit {

  constructor(public navCtrl: NavController,
    private Servicios: ServiciosGService, public loadingController: LoadingController, private storage: Storage) { }

  loading: any;

  /** Variables del nuevo usuario */
  public email: string;
  public nombre: string;
  public password: string;
  public password2: string;
  public error: string = '';
  public apellido: string;
  public idgalpon: string;

  ngOnInit() {
  }

/*FN****************************************************************************
*
*   void back()
*
*   Retorna:         Nada
*
*   Proposito:       Navega a la pagina anterior. 
*
*******************************************************************************/
  back() {
    this.navCtrl.back();
  }

/*FN****************************************************************************
*
*   void CrearUsuario()
*
*   Retorna:         Nada
*
*   Proposito:       Dado los parametros ingresados por el ususario en el HTML
*                    crea un nuevo usuario e inicia sesion. Si hay algun error
*                    al momento de crear el usuario, se mostrara el error en
*                    pantalla. 
*
*******************************************************************************/
  CrearUsuario() {
    this.presentLoading()
    if (this.password === this.password2) {
      this.Servicios.crearUsuario(this.email, this.password, this.nombre, this.apellido, this.idgalpon).then(auth => {
        this.navCtrl.navigateRoot('/mainmenu');
        this.storage.set('log', 'si');
        console.log("el usuario es" + auth);
        this.loading.dismiss();

      }).catch(err => { console.log(err); this.error = 'Error al crear la cuenta: ' + err; this.loading.dismiss(); })
    } else {
      this.error = 'Contraseñas Diferentes! Verifique';
      this.loading.dismiss();
    }
  }

  /*FN****************************************************************************
  *
  *   async presentLoading()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Permite mostrar un dialogo en patalla mientras que se realiza
  *                    otro proceso. 
  *
  *******************************************************************************/
  async presentLoading() {
    if (this.password === this.password2) {
      this.loading = await this.loadingController.create({
        message: 'Cargando...',
        duration: 16000
      });
      await this.loading.present();
      const { role, data } = await this.loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
  }

}
