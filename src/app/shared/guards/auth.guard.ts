import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(

    private _data: FirebaseServiceService,
    private _router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

      if (!this._data.isLoggedIn) {
        alert('No estás logueado');
        this._router.navigate(['/']);
        return false;
      }
      return true;


      /*
    if (!this._data.isLoggedIn) {
      alert("NO TIENES PERMISO");
     
    }
    return this._data.isLoggedIn;

    /*if(!this._data.isLoggedIn)
  alert('no puedes entrar')
    return this._data.isLoggedIn;
}
*/
  }
}
