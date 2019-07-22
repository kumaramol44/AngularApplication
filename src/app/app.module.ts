import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { RoutesModule } from './routes/routes.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthService } from './auth.service';
import { NgxSpinnerModule } from "ngx-spinner";
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    CoreModule,
    RoutesModule,
    HttpClientModule,
    NgxSpinnerModule,
    // NgxDatatableModule

  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
