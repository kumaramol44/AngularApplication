import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  userAuthentication(userName,password) {
    var data="username="+userName+"&password="+password+"&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-urlencoded'})
    return this.http.post('http://localhost:44318/token',data,{headers:reqHeader});
  }
}
