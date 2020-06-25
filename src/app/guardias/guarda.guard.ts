/* guarda.guard ***************************************************************/
/*                                                                            */
/*                         Codigo guarda (funciones)                          */
/*                                                                            */
/******************************************************************************/

/*******************************************************************************

    Notas:           Este código permite el acceso y la identificación del
                     usuario garantizando que solo un usuario con sesión 
                     iniciada pueda acceder a las páginas. 

    Registro de Revisiones:

    FECHA      RESPONSABLE  REVISION
    -----------------------------------------------------------------------
    Mar 05/20  S.Londoño    Implementacion original

    Mar 05/20  D.Salazar    Implementacion original


*******************************************************************************/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GuardaGuard implements   CanActivate {

  constructor(private AFauth : AngularFireAuth,
    private router: Router){}

/*FN****************************************************************************
*
*   void canActivate()
*
*   Retorna:         Estado de la autenticacion 
*
*   Proposito:       Verifica que el ususario se encuentre autenticado en el 
*                    servidor. De lo contrario lo redirije a la pagina de 
*                    iniciar sesion.
*
*******************************************************************************/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.AFauth.authState.pipe(map( auth => {
        if(isNullOrUndefined(auth)){
          this.router.navigate(['/iniciar-sesion']);
          return false
        }else{
          return true
        }
      }))

  
  }
}
