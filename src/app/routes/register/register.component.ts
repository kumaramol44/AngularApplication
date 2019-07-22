import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from  '@angular/router'
import { RegisterModel } from './register-model';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { RegisterService } from '../../services/register.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'  
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private route: Router,private registerService: RegisterService,private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailaddress: ['', [Validators.required, Validators.email]],
      passsword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  register($ev, model: RegisterModel) {
    $ev.preventDefault();
    for (let c in this.registerForm.controls) {
      this.registerForm.controls[c].markAsTouched();
    }

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();    
    this.registerService.register(model).subscribe((data: any) => {
      this.spinner.hide();
      this.showModal(data);      
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.showModal(err.error);
      })
      this.registerForm.reset();
    
  }
  showModal(errMessage) {
    Swal.fire(errMessage);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.passsword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
  redirectToLogin(){
     this.route.navigate(['/login']);
  }
}
