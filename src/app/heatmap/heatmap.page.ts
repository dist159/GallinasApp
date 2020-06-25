/* heatmap.page ***************************************************************/
/*                                                                            */
/*                        Pagina heatmap (funciones)                          */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Codigo de las funciones de la pagina heatmap. Esta pagina 
                     obtiene los datos almacenados en el servidor de los sensores
                     de temperatura y los muestra con diferentes colores dado su
                     valor.

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiciosGService } from '../servicios-g.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.page.html',
  styleUrls: ['./heatmap.page.scss'],
})
export class HeatmapPage implements OnInit {

  /** Variables de los colores para los tres sensores */
  colorA_1: string = "#ffffff";
  colorA_2: string = "#ffffff";
  colorA_3: string = "#ffffff";
  colorA_4: string = "#ffffff";

  colorB_1: string = "#ffffff";
  colorB_2: string = "#ffffff";
  colorB_3: string = "#ffffff";
  colorB_4: string = "#ffffff";

  colorC_1: string = "#ffffff";
  colorC_2: string = "#ffffff";
  colorC_3: string = "#ffffff";
  colorC_4: string = "#ffffff";



  constructor(private db: AngularFireDatabase, public navCtrl: NavController,
    public _Servicios: ServiciosGService, private storage: Storage, ) { }

  idGalpon: String;
  value: number;
  ngOnInit() {
    this.storage.get("_idGalpon").then(res => {
      this.idGalpon = res;

      /** Obtiene el ultimo dato del sensor de temperatura 1*/
      this._Servicios.getLastDataFromSensorRealTime("SensorTemp1", this.idGalpon).subscribe(res => {
        res.subscribe(res => {
          /** Dado el valor obtenido modificara los colores de cada capa en el HTML */
          console.log("Valor: " + res.payload.val())
          if (res.payload.val() as number < 5) {
            this.colorA_1 = "#2E17EA"
            this.colorA_2 = "#1727EA"
            this.colorA_3 = "#174EEA"
            this.colorA_4 = "#1762EA"
          } else if (res.payload.val() < 10) {
            this.colorA_1 = "#179FEA"
            this.colorA_2 = "#17DAEA"
            this.colorA_3 = "#17EAD7"
            this.colorA_4 = "#17EAAC"
          } else if (res.payload.val() < 15) {
            this.colorA_1 = "#17EA7C"
            this.colorA_2 = "#17EA4B"
            this.colorA_3 = "#17EA1A"
            this.colorA_4 = "#34EA17"
          } else if (res.payload.val() < 20) {
            this.colorA_1 = "#65EA17"
            this.colorA_2 = "#75EA17"
            this.colorA_3 = "#96EA17"
            this.colorA_4 = "#CAEA17"
          } else if (res.payload.val() < 25) {
            this.colorA_1 = "#E0D63D"
            this.colorA_2 = "#E2C82A"
            this.colorA_3 = "#EBCE1B"
            this.colorA_4 = "#EBB51B"
          } else if (res.payload.val() >= 25) {
            this.colorA_1 = "#F0730F"
            this.colorA_2 = "#F0730F"
            this.colorA_3 = "#F0540F"
            this.colorA_4 = "#F0350F"
          }
        })
      })

      /** Obtiene el ultimo dato del sensor de temperatura 2*/
      this._Servicios.getLastDataFromSensorRealTime("SensorTemp2", this.idGalpon).subscribe(res => {
        res.subscribe(res => {
          console.log("Valor: " + res)
          /** Dado el valor obtenido modificara los colores de cada capa en el HTML */
          if (res.payload.val() as number < 5) {
            this.colorB_1 = "#2E17EA"
            this.colorB_2 = "#1727EA"
            this.colorB_3 = "#174EEA"
            this.colorB_4 = "#1762EA"
          } else if (res.payload.val() < 10) {
            this.colorB_1 = "#179FEA"
            this.colorB_2 = "#17DAEA"
            this.colorB_3 = "#17EAD7"
            this.colorB_4 = "#17EAAC"
          } else if (res.payload.val() < 15) {
            this.colorB_1 = "#17EA7C"
            this.colorB_2 = "#17EA4B"
            this.colorB_3 = "#17EA1A"
            this.colorB_4 = "#34EA17"
          } else if (res.payload.val() < 20) {
            this.colorB_1 = "#65EA17"
            this.colorB_2 = "#75EA17"
            this.colorB_3 = "#96EA17"
            this.colorB_4 = "#CAEA17"
          } else if (res.payload.val() < 25) {
            this.colorB_1 = "#E0D63D"
            this.colorB_2 = "#E2C82A"
            this.colorB_3 = "#EBCE1B"
            this.colorB_4 = "#EBB51B"
          } else if (res.payload.val() >= 25) {
            this.colorB_1 = "#F0730F"
            this.colorB_2 = "#F0730F"
            this.colorB_3 = "#F0540F"
            this.colorB_4 = "#F0350F"
          }
        })
      })

      /** Obtiene el ultimo dato del sensor de temperatura 3*/
      this._Servicios.getLastDataFromSensorRealTime("SensorTemp3", this.idGalpon).subscribe(res => {
        res.subscribe(res => {
          console.log("Valor: " + res)
          /** Dado el valor obtenido modificara los colores de cada capa en el HTML */
          if (res.payload.val() as number < 5) {
            this.colorC_1 = "#2E17EA"
            this.colorC_2 = "#1727EA"
            this.colorC_3 = "#174EEA"
            this.colorC_4 = "#1762EA"
          } else if (res.payload.val() < 10) {
            this.colorC_1 = "#179FEA"
            this.colorC_2 = "#17DAEA"
            this.colorC_3 = "#17EAD7"
            this.colorC_4 = "#17EAAC"
          } else if (res.payload.val() < 15) {
            this.colorC_1 = "#17EA7C"
            this.colorC_2 = "#17EA4B"
            this.colorC_3 = "#17EA1A"
            this.colorC_4 = "#34EA17"
          } else if (res.payload.val() < 20) {
            this.colorC_1 = "#65EA17"
            this.colorC_2 = "#75EA17"
            this.colorC_3 = "#96EA17"
            this.colorC_4 = "#CAEA17"
          } else if (res.payload.val() < 25) {
            this.colorC_1 = "#E0D63D"
            this.colorC_2 = "#E2C82A"
            this.colorC_3 = "#EBCE1B"
            this.colorC_4 = "#EBB51B"
          } else if (res.payload.val() >= 25) {
            this.colorC_1 = "#F0730F"
            this.colorC_2 = "#F0730F"
            this.colorC_3 = "#F0540F"
            this.colorC_4 = "#F0350F"
          }
        })
      })
    });


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
