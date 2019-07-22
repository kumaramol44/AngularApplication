import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from '../contact/contact-model'
import { ContactService } from '../../services/contact.service'
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailaddress: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      subject: ['', Validators.required],
      description: [''],
      supportType: [''],
    });
  }
  showModal(errMessage) {
    Swal.fire(errMessage);
  }

  sendEmail($ev, model: ContactModel) {

    for (let c in this.contactForm.controls) {
      this.contactForm.controls[c].markAsTouched();
    }

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    this.spinner.show();    
    // model.name = this.contactForm.controls['name'].value;
    // model.description = this.contactForm.controls['description'].value;
    // model.emailaddress = this.contactForm.controls['email'].value;
    // model.subject = this.contactForm.controls['subject'].value;
    // model.supportType = this.contactForm.controls['supportType'].value;
    // model.telephone = this.contactForm.controls['telephone'].value;

    this.contactService.sendEmail(model).subscribe((data: any) => {
      this.spinner.hide();
      this.showModal(data);
      
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.showModal(err.error.error_description);
      })
      this.contactForm.reset();
  }
}
