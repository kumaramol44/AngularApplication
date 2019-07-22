import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { AuthService } from './auth.service';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    let url:string=state.url;
    if (!this.auth.isAuthenticated()) {
      this.auth.redirectUrl=url;
      this.router.navigate(['/login'],{queryParams:{return:state.url}});      
      return false;
    }
    return true;
  }
}
