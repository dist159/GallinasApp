/* iniciar-sesion.page ********************************************************/
/*                                                                            */
/*                   Pagina iniciar-sesion (funciones)                        */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina iniciar-sesion. Esta 
                     pagina permite iniciar sesion y navegar a otra pagina.
                    

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { ServiciosGService, usuario } from '../servicios-g.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  cargandoA: any;
  constructor(public navCtrl: NavController,
    public Servicios: ServiciosGService, public loadingController: LoadingController, private storage: Storage) { }

  /** Variables para leer el correo y la contrasena en el HTML */
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };


  ngOnInit() {
  }

  /*FN****************************************************************************
  *
  *   void iniciarSesion()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Dado un cuenta de correo y una contrasena, verifica en los
  *                    servidores de google si se encuentra registrado y la informacion
  *                    concuerda. En caso de un resultado positivo, se navegara
  *                    a la pagina MainMenu. Tambien determinara si el usuario es
  *                    administrador o usuario normal.
  *
  *******************************************************************************/
  iniciarSesion() {
    this.presentLoadingA();
    this.Servicios.userState().subscribe((user: firebase.User) => {
      this.Servicios.iniciarsesion(this.account.email, this.account.password).then(res => {
        this.cargandoA.dismiss();
        this.Servicios.getUsuario(user.uid).subscribe(res => {
          const UsuarioA = res.payload.val() as usuario;
          console.log(UsuarioA);
          if (UsuarioA !== undefined) {
            this.account.email="";
            this.account.password="";
            console.log(UsuarioA.admin)
            if (UsuarioA.admin == true) {
              this.navCtrl.navigateRoot('/admin');
            } else {
              this.navCtrl.navigateRoot('/mainmenu');
            }
          } else {
            console.log("Error al iniciar")
          }
        });
        this.storage.set('log', 'si');
      }).catch(err => {
        this.cargandoA.dismiss();
        console.log("Error al iniciar")
      });
    });
  }




  /*FN****************************************************************************
  *
  *   async presentLoadingA()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Permite mostrar un dialogo en patalla mientras que se realiza
  *                    otro proceso. 
  *
  *******************************************************************************/
  async presentLoadingA() {
    this.cargandoA = await this.loadingController.create({
      message: 'Verificando los datos...',
      duration: 10000
    }); await this.cargandoA.present();
  }

}
