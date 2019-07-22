import { Component, OnInit, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {LoginService } from '../../services/login.service';
import Swal from 'sweetalert2'

 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result: any;  
  expiryDate:any;

  constructor(fb: FormBuilder, private route: Router,private loginService:LoginService) {
    this.loginForm = fb.group({
      username: ['kumaramol44@yahoo.co.in', Validators.required],
      password: ['123456', Validators.required]
    })
  }

  ngOnInit() {

  }

  showModal(errMessage){
    Swal.fire(errMessage);
  }

  login() {
    if(this.loginForm.valid)
    {
      this.loginService.userAuthentication(this.loginForm.get('username').value,this.loginForm.get('password').value).subscribe((data:any)=>{
        localStorage.setItem('userToken',data.access_token);        
        var now = new Date();
        this.expiryDate = new Date(now.getTime() + data.expires_in * 1000);
        localStorage.setItem('expiryDate',this.expiryDate);
        this.route.navigate(['/aboutus']);
    },
    (err:HttpErrorResponse)=>{
       this.showModal(err.error.error_description);
    })
   
    }
       
  }
  validateForm() {
    if (this.loginForm.invalid) {
      this.loginForm.get('username').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }    
    // do something else
}
signUp(){
  this.route.navigate(['/register']);
}
}
