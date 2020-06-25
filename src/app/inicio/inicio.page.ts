/* inicio.page ****************************************************************/
/*                                                                            */
/*                        Pagina inicio (funciones)                           */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina inicio. Esta pagina es 
                     la pagina inicial y la primera que ve el usuario. Se 
                     verificara si el usuario ya tiene la sesion iniciada y dado
                     el resultado lo redirigira a otra pagina.

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiciosGService, usuario } from '../servicios-g.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public Servicios: ServiciosGService, public navCtrl: NavController) { }

  UsuarioLocal: usuario;

  ngOnInit() {
    /**  Si existe un usuario con sesion iniciada se redireccionara a la pagina mainmenu */
    /**  de lo contrario se redireccionara a la pagina iniciar-sesion. Si el usuario es  */
    /**  administrador se redireccionara a la pagina admin (aun no existe).              */
    this.Servicios.userState().subscribe((user: firebase.User) => {
      if (user) {
        this.Servicios.getUsuario(user.uid).subscribe(res => {
          const usuarioto = res.payload.val() as usuario;
          if (usuarioto !== null) {
            if (usuarioto.admin == true) {
              this.navCtrl.navigateRoot('/admin');
            } else {
              this.InicioDirecto();
            }
          }
        });
      } else {
        this.login()
      }
    })
  }

  /*FN****************************************************************************
*
*   void login()
*
*   Retorna:         Nada
*
*   Proposito:       Navega a la pagina iniciar-sesion. 
*
*******************************************************************************/
  login() {
    this.navCtrl.navigateRoot('/iniciar-sesion');
  }

  /*FN****************************************************************************
*
*   void InicioDirecto()
*
*   Retorna:         Nada
*
*   Proposito:       Navega a la pagina mainmenu. 
*
*******************************************************************************/
  InicioDirecto() {
    this.navCtrl.navigateRoot('/mainmenu');
  }

  /*FN****************************************************************************
*
*   void signup()
*
*   Retorna:         Nada
*
*   Proposito:       Navega a la pagina crear-ususario. 
*
*******************************************************************************/
  signup() {
    this.navCtrl.navigateRoot('/crear-ususario');
  }

}
