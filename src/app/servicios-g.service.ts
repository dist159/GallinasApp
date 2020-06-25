/* Servicios ******************************************************************/
/*                                                                            */
/*                  funciones de conexion con el servidor                     */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Este codigo se encarga de las funciones que acceden a la
                     base de datos para leer, escribir y analizar los datos.

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 09/17  S.Londoño    Implementacion original

    Mar 09/17  D.Salazar    Implementacion original


*******************************************************************************/

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
/* Declaracion de estructura de tipo usuario */
export interface usuario {
  uid: string;             /* Identificacion unica por usuario              */
  nombre: string;          /* Nombre del usuario                            */
  apellido: string;        /* Apellido del usuario                          */
  galponid: string;        /* Identificacion del galpon asociada al usuario */
  admin: boolean;          /* Usuario es administrador                      */
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosGService {
  constructor(private db: AngularFireDatabase, private AFauth: AngularFireAuth) { }


  /*FN****************************************************************************
  *
  *   void crearUsuario(correo:string,
  *         contrasena: string, nombre:string,
  *         apellido : string, idgalpon:string)
  *
  *   Retorna:         El estado de exito o error
  *
  *   Proposito:       Crea un nuevo usuario al recibir todos los parametros 
  *                    solicitados y lo almacena en la base de datos. 
  *
  *******************************************************************************/
  crearUsuario(correo: string, contrasena: string, nombre: string, apellido: string, idgalpon: string) {


    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(correo, contrasena).then(res => {
        // console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.object('Usuarios/' + uid).set({
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          galponid: idgalpon
        })

        resolve(res)
      }).catch(err => reject(err))
    })

  }



  /*FN****************************************************************************
  *
  *   void iniciarsesion(email: string, contrasena: string)
  *
  *   Retorna:         El estado de exito o error
  *
  *   Proposito:       Dado un correo y una contraseña accedera a la funcion 
  *                    signInWithEmailAndPassword de la libreria AngularFireAuth 
  *                    y retorna el estado del proceso. En caso de obtener un caso 
  *                    de exito se obtendra el usuario desde la base de datos.
  *
  *******************************************************************************/
  iniciarsesion(email: string, contrasena: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, contrasena).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });


  }

  /*FN****************************************************************************
  *
  *   void userDetails()
  *
  *   Retorna:         Autenticidad del usuario
  *
  *   Proposito:       Obtiene informacion basica de la identidad del usuario actual. 
  *
  *******************************************************************************/
  userDetails() {
    return this.AFauth.currentUser;
  }

  /*FN****************************************************************************
  *
  *   void cerrarSesion() 
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Llamara a la funcion signOut() de la libreria AngularFireAuth. 
  *
  *******************************************************************************/
  cerrarSesion() {
    this.AFauth.signOut();
  }

  /*FN****************************************************************************
  *
  *   void getUsuario(uid: string)
  *
  *   Retorna:         El estado de exito o error
  *
  *   Proposito:       Obtiene un ususario desde la base de datos dado su 
  *                    identificacion unica. 
  *
  *******************************************************************************/
  getUsuario(uid: string) {
    return this.db.object("Usuarios/" + uid).snapshotChanges().pipe(map(res => {
      return res;
    }));
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
  userState() {
    return this.AFauth.authState;
  }


  /*FN****************************************************************************
  *
  *   getLastDataFromSensor(sensorID: String,GalponID: String)
  *
  *   Retorna:         la humedad o temperatura del sensor almacenado en el 
  *                    servidor
  *
  *   Proposito:       Se comunica con el servidor y dado la identificacion del 
  *                    galpon y la identificacion del sensor entregara el ultimo 
  *                    valor de humedad o temperatura almacenado en el servidor 
  *                    para dicho sensor. El dato a retornar depende de la 
  *                    identificacion del sensor en donde esta embebido el tipo 
  *                    de dato (Hum para humedad y Temp para temperatura).
  *                    Para obtener el ultimo valor primero obtiene el contador 
  *                    con el numero total de las muestras almacenadas por
  *                    el sensor y lo utiliza como indise para obtener la ultima 
  *                    muestra almacenada.  
  *
  *******************************************************************************/
  getLastDataFromSensor(sensorID: String, GalponID: String) {

    return new Promise((resolve, reject) => {
      this.db.object("Galpones/" + GalponID + "/" + 'contador').snapshotChanges().subscribe(action => {
        const contador = action.payload.val() as number;
        this.db.object("Galpones/" + GalponID + "/" + sensorID + "/" + (contador - 1) + "/val")
          .snapshotChanges().subscribe(action => {
            resolve(action.payload.val());
          });
      });
    });
  }

  /*FN****************************************************************************
  *
  *   getLastDataFromSensorRealTime(sensorID: String,GalponID: String)
  *
  *   Retorna:         la humedad o temperatura del sensor almacenado en el 
  *                    servidor
  *
  *   Proposito:       Se comunica con el servidor y dado la identificacion del 
  *                    galpon y la identificacion del sensor entregara el ultimo 
  *                    valor de humedad o temperatura almacenado en el servidor 
  *                    para dicho sensor. El dato a retornar depende de la 
  *                    identificacion del sensor en donde esta embebido el tipo 
  *                    de dato (Hum para humedad y Temp para temperatura).
  *                    Para obtener el ultimo valor primero obtiene el contador 
  *                    con el numero total de las muestras almacenadas por
  *                    el sensor y lo utiliza como indise para obtener la ultima 
  *                    muestra almacenada. Si se guarda otra muestra en a base de
  *                    de datos se actualizara una vez que reciba el dato.  
  *
  *******************************************************************************/
  getLastDataFromSensorRealTime(sensorID: String, GalponID: String) {


    return this.db.object("Galpones/" + GalponID + "/" + 'contador').snapshotChanges().pipe(map(action => {
      const contador = action.payload.val() as number;
      return this.db.object("Galpones/" + GalponID + "/" + sensorID + "/" + (contador - 1) + "/val")
        .snapshotChanges().pipe(map(action => {
          return action;
        }));
    }));

  }
}

