import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MenuComponent } from './menu/menu.component'
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenuComponent,
    LayoutComponent
  ],
  exports: [
    MenuComponent,
    LayoutComponent
  ]
})
export class CoreModule { }
