/* home.page ******************************************************************/
/*                                                                            */
/*                          Pagina home (funciones)                           */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina home. Esta pagina 
                     permite la activación de los actuadores al modificar estas
                     variables en el servidor.

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { usuario, ServiciosGService } from '../servicios-g.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  humedad: any;
  temperatura: any;
  contador: any = 2000;
  idGalpon: String;
  valorInicia: number;

  /** Variables de configuracion para las graficas */
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  datosss: any[] = [];

  chartData2: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels2: Label[];

  chartData3: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels3: Label[];

  datosss2: any[] = [];
  datosss3: any[] = [];

  constructor(private db: AngularFireDatabase, private menu: MenuController, public navCtrl: NavController,
    private storage: Storage, public _Servicios: ServiciosGService) {

  }
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Temperatura sensor 1'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      //backgroundColor: '#0000FF'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';

  chartOptions2 = {
    responsive: true,
    title: {
      display: true,
      text: 'Temperatura sensor 2'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors2: Color[] = [
    {
      borderColor: '#000000',
      //backgroundColor: '#0000FF'
    }
  ];
  chartType2 = 'line';
  showLegend2 = false;

  // For search
  stock2 = '';


  //tres

  chartOptions3 = {
    responsive: true,
    title: {
      display: true,
      text: 'Temperatura sensor 3'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors3: Color[] = [
    {
      borderColor: '#000000',
      //backgroundColor: '#0000FF'
    }
  ];
  chartType3 = 'line';
  showLegend3 = false;

  // For search
  stock3 = '';



  UsuarioLocal: usuario;

  ngOnInit() {
    /** Se obtiene el id del galpon */
    this.storage.get("_idGalpon").then(res => {
      this.idGalpon = res;

      /** Determina el contador para asiganarlo como un indice y obtener el ultimo dato almacenado en el servidor */
      this.db.object("Galpones/" + this.idGalpon + "/" + 'contador').snapshotChanges().subscribe(action => {
        this.contador = action.payload.val() as number;

        /** Se obtiene el ultimo dato almacenado en la base de datos para la temperatura de x galpon para el sensor 1 */
        this.db.object("Galpones/" + this.idGalpon + "/" + "SensorTemp1/" + (this.contador - 1) + "/val")
          .snapshotChanges().subscribe(action => {
            this.temperatura = action.payload.val();
          });

        /** Se obtiene el ultimo dato almacenado en la base de datos para la humedad de x galpon para el sensor 1 */
        this.db.object("Galpones/" + this.idGalpon + "/" + "SensorHum1/" + (this.contador - 1) + "/val")
          .snapshotChanges().subscribe(action => {
            this.humedad = action.payload.val();
          });
      });
      this._Servicios.userState().subscribe((user: firebase.User) => {
        const _getUsuario = this._Servicios.getUsuario(user.uid).subscribe(res => {
          this.UsuarioLocal = res.payload.val() as usuario;
          console.log("El Usuario actual es:" + this.UsuarioLocal);
          _getUsuario.unsubscribe();
        });
      });
    }).catch(err => {


    });



    this.chartLabels = [];
    this.chartData[0].data = [];

    /** Graficas con los datos de los sensores */


    /** Este codigo se encuentra comentado dado que la funcionalidad  */
    /** de las graficas va a estar dispuesta para otra pagina.        */

    /*for (let i=0;i<10;i++) {
      this.chartLabels.push("i"+i);
      this.chartData[0].data.push(i);
    }*/


    const xx = this.db.object('SensorTemp1').snapshotChanges().subscribe(action => {
      console.log("Satosss")
      console.log(action.type);
      console.log(action.key)
      this.chartLabels = [];
      console.log(action.payload.val())
      this.datosss = action.payload.val() as any[];
      console.log(this.datosss.length)
      let entry: any = null;

      for (let i = 2300; i < this.datosss.length; i = i + 1) {

        if (i >= this.datosss.length) {
          i = 10000000;
          break;
        } else {
          entry = this.datosss[i];
          this.chartLabels.push(entry.time);
          this.chartData[0].data.push(entry.val);
        }

      }
      // xx.unsubscribe();
    })


    const xxx = this.db.object('SensorHum2').snapshotChanges().subscribe(action => {
      console.log("Satosss")
      console.log(action.type);
      console.log(action.key)
      this.chartLabels2 = [];
      console.log(action.payload.val())
      this.datosss2 = action.payload.val() as any[];
      console.log(this.datosss.length)
      let entry: any = null;

      for (let i = 2300; i < this.datosss.length; i = i + 1) {

        if (i >= this.datosss.length) {
          i = 10000000;
          break;
        } else {
          entry = this.datosss2[i];
          this.chartLabels2.push(entry.time);
          this.chartData2[0].data.push(entry.val);
        }

      }
      // xx.unsubscribe();
    })


    const xxx2 = this.db.object('SensorHum3').snapshotChanges().subscribe(action => {
      console.log("Satosss")
      console.log(action.type);
      console.log(action.key)
      this.chartLabels3 = [];
      console.log(action.payload.val())
      this.datosss3 = action.payload.val() as any[];
      console.log(this.datosss.length)
      let entry: any = null;

      for (let i = 2300; i < this.datosss.length; i = i + 1) {

        if (i >= this.datosss.length) {
          i = 10000000;
          break;
        } else {
          entry = this.datosss3[i];
          this.chartLabels3.push(entry.time);
          this.chartData3[0].data.push(entry.val);
        }

      }
      // xx.unsubscribe();
    })
    // Call student form when component is ready
    /*  console.log("RR= "+this.humedad)
      this.db.object('/').update({content: 30})
      const relative =  this.db.object('content').valueChanges();
      this.db.object('humedad').snapshotChanges().pipe(map(rooms => {
       this.humedad=rooms;
       console.log("WWWWW")
       console.log(rooms)
      }))
      console.log(relative);*/




  }


  /*FN****************************************************************************
  *
  *   void boton1()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 0 1 1 en el servidor. 
  *
  *******************************************************************************/
  boton1() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador1_1: 0, Actuador1_2: 1, Actuador1_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 0 1 en el servidor.  
  *
  *******************************************************************************/
  boton2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador1_1: 1, Actuador1_2: 0, Actuador1_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton3()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 0 en el servidor.  
  *
  *******************************************************************************/
  boton3() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador1_1: 1, Actuador1_2: 1, Actuador1_3: 0 });
  }

  /*FN****************************************************************************
  *
  *   void boton2_1()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 0 1 1 en el servidor. 
  *
  *******************************************************************************/
  boton2_1() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador2_1: 0, Actuador2_2: 1, Actuador2_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton2_2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 0 1 en el servidor. 
  *
  *******************************************************************************/
  boton2_2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador2_1: 1, Actuador2_2: 0, Actuador2_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton2_3()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 0 en el servidor. 
  *
  *******************************************************************************/
  boton2_3() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador2_1: 1, Actuador2_2: 1, Actuador2_3: 0 });
  }

  /*FN****************************************************************************
  *
  *   void boton3_1()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 0 1 1 en el servidor. 
  *
  *******************************************************************************/
  boton3_1() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador3_1: 0, Actuador3_2: 1, Actuador3_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton3_2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 0 1 en el servidor. 
  *
  *******************************************************************************/
  boton3_2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador3_1: 1, Actuador3_2: 0, Actuador3_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void boton3_3()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 0 en el servidor.
  *
  *******************************************************************************/
  boton3_3() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador3_1: 1, Actuador3_2: 1, Actuador3_3: 0 });
  }

  /*FN****************************************************************************
  *
  *   void apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 1 en el servidor.
  *
  *******************************************************************************/
  apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador1_1: 1, Actuador1_2: 1, Actuador1_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void apagar2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 1 en el servidor.
  *
  *******************************************************************************/
  apagar2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador2_1: 1, Actuador2_2: 1, Actuador2_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void apagar3()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica los actuador con los valores 1 1 1 en el servidor.
  *
  *******************************************************************************/
  apagar3() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Actuador3_1: 1, Actuador3_2: 1, Actuador3_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botonFoger()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor.
  *
  *******************************************************************************/
  botonFoger() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Foger: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal1()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor.
  *
  *******************************************************************************/
  botonCal1() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_1: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor. 
  *
  *******************************************************************************/
  botonCal2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_2: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal3()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor.
  *
  *******************************************************************************/
  botonCal3() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_3: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botondamp1()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor.
  *
  *******************************************************************************/
  botondamp1() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Damper_1: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botondamp2()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 1 en el servidor.
  *
  *******************************************************************************/
  botondamp2() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Damper_2: 1 });
  }

  /*FN****************************************************************************
  *
  *   void botonFogerApagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:      Modifica el actuador con el valor 0 en el servidor.
  *
  *******************************************************************************/
  botonFogerApagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Foger: 0 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal1Apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 0 en el servidor. 
  *
  *******************************************************************************/
  botonCal1Apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_1: 0 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal2Apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 0 en el servidor.
  *
  *******************************************************************************/
  botonCal2Apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_2: 0 });
  }

  /*FN****************************************************************************
  *
  *   void botonCal3Apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 0 en el servidor.
  *
  *******************************************************************************/
  botonCal3Apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Calefactor_3: 0 });
  }

  /*FN****************************************************************************
  *
  *   void botondamp1Apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 0 en el servidor.
  *
  *******************************************************************************/
  botondamp1Apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Damper_1: 0 });
  }

  /*FN****************************************************************************
  *
  *   void botondamp2Apagar()
  *
  *   Retorna:         Nada
  *
  *   Proposito:       Modifica el actuador con el valor 0 en el servidor.
  *
  *******************************************************************************/
  botondamp2Apagar() {

    this.db.object("Galpones/CUNCOG01" + "/Actuadores")
      .update({ Damper_2: 0 });
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
} 