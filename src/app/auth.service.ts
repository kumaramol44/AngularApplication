import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string;

  constructor(private router: Router,public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {    
    let token = localStorage.getItem('userToken');
    let expiryDate=localStorage.getItem('expiryDate');

    let expiryDateTime=new Date(expiryDate);
    let currentDateTime=new Date();

    if(currentDateTime  < expiryDateTime)
    {
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
      }
         return true;
      // return !this.jwtHelper.isTokenExpired(token);
    }
    
    // Check whether the token is expired and return
    // true or false
    // if(token!=null)
    // {
    // }
     return false; 
  }
}
