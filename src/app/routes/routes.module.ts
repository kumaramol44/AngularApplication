import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';

import { LayoutComponent } from "./../core/layout/layout.component"
import { AuthGaurdService as Auth} from '../auth-gaurd.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { CurrencyComponent } from './currency/currency.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTreeModule} from '@angular/material/tree';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: "/login", pathMatch: "full" },
      { path: 'register',redirectTo: "/register"},
      { path: 'home', component: HomeComponent,canActivate: [Auth] },
      { path: 'contact', component: ContactComponent,canActivate: [Auth] },
      { path: 'aboutus', component: AboutusComponent,canActivate: [Auth]  },
      { path: 'currency', component: CurrencyComponent,canActivate: [Auth] }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes),
     NgxDatatableModule,
     MatTreeModule
  ],
  declarations: [LoginComponent, HomeComponent, ContactComponent, AboutusComponent,RegisterComponent,CurrencyComponent],
  exports: [RouterModule]
})
export class RoutesModule { }