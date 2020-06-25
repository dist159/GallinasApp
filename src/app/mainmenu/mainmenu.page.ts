/* mainmenu.page **************************************************************/
/*                                                                            */
/*                       Pagina mainmenu (funciones)                          */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina mainmenu. Esta pagina 
                     es la pagina principal al iniciar sesion. Tiene un menu 
                     lateral para acceder a otra paginas y la lectura basica 
                     de los sensores de x galpon.

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiciosGService, usuario } from '../servicios-g.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {

  /* Variables para los sensores */
  humedad: number = 0;
  temperatura: number = 0;
  humedad2: number = 0;
  temperatura2: number = 0;
  humedad3: number = 0;
  temperatura3: number = 0;
  contador: any = 2000;
  /*Variables del usuario*/
  UsuarioLocal: usuario;
  idGalpon: String;

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    public _Servicios: ServiciosGService,
    private storage: Storage,
    private db: AngularFireDatabase) { }

  ngOnInit() {

    /** Carga directamente los datos del servidor almacenados para cada uno de los sensosres */
    /** Se obtiene el objeto de usuario y se determina el galpon */
    this._Servicios.userState().subscribe((user: firebase.User) => {
      const _getUsuario = this._Servicios.getUsuario(user.uid).subscribe(res => {
        this.UsuarioLocal = res.payload.val() as usuario;
        this.idGalpon = this.UsuarioLocal.galponid;
        this.storage.set('_idGalpon', this.idGalpon);
        console.log(this.idGalpon)

        /** Determina el contador para asiganarlo como un indice y obtener el ultimo dato almacenado en el servidor */
        this.db.object("Galpones/" + this.idGalpon + "/" + 'contador').snapshotChanges().subscribe(action => {
          console.log(action.type);
          console.log(action.key)
          console.log(action.payload.val())
          this.contador = action.payload.val() as number;

          /** Se obtiene el ultimo dato almacenado en la base de datos para la temperatura de x galpon para el sensor 1 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorTemp1/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.temperatura = action.payload.val() as number
          });

          /** Se obtiene el ultimo dato almacenado en la base de datos para la humedad de x galpon para el sensor 1 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorHum1/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.humedad = action.payload.val() as number
          });

          /** Se obtiene el ultimo dato almacenado en la base de datos para la temperatura de x galpon para el sensor 2 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorTemp2/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.temperatura2 = action.payload.val() as number
          });

          /** Se obtiene el ultimo dato almacenado en la base de datos para la humedad de x galpon para el sensor 2 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorHum2/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.humedad2 = action.payload.val() as number
          });

          /** Se obtiene el ultimo dato almacenado en la base de datos para la temperatura de x galpon para el sensor 3 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorTemp3/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.temperatura3 = action.payload.val() as number
          });

          /** Se obtiene el ultimo dato almacenado en la base de datos para la humedad de x galpon para el sensor 3 */
          this.db.object("Galpones/" + this.idGalpon + "/" + "SensorHum3/" + (this.contador - 1) + "/val").snapshotChanges().subscribe(action => {
            console.log(action.type);
            console.log(action.key)
            console.log(action.payload.val())
            this.humedad3 = action.payload.val() as number
          });
        });
        _getUsuario.unsubscribe();
      });
    });
  }

  /*FN****************************************************************************
  *
  *   void userState()
  *
  *   Retorna:         El estado de la autenticidad del ususario
  *
  *   Proposito:       Permite obtener el estado de la autenticidad del usuario 
  *                    verificando si la sesion esta iniciada.  
  *
  *******************************************************************************/
  control() {
    this.navCtrl.navigateRoot('/home');
  }

  /*FN****************************************************************************
  *
  *   void openHeatMap()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Navega a la pagina heatmap. 
  *
  *******************************************************************************/
  openHeatMap() {
    this.navCtrl.navigateRoot('/heatmap');
  }

  /*FN****************************************************************************
  *
  *   void openEnd()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Abre el menu lateral.
  *
  *******************************************************************************/
  openEnd() {
    this.menu.toggle('custom');
  }

  /*FN****************************************************************************
  *
  *   void cerrar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Cierra la sesion al borrar las credenciales del usuario 
  *                    y modifica la bandera de la sesion iniciada.  
  *
  *******************************************************************************/
  cerrar() {
    this.storage.set('log', 'no');
    this._Servicios.cerrarSesion();
    this.navCtrl.navigateRoot('/iniciar-sesion');

  }
  config() {

  }

  ayuda() {

  }

}
