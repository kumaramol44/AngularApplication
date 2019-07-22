import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.route.navigate(['/home']);
  }
  goToAbout() {
    this.route.navigate(['/aboutus']);
  }
  goToContact() {
    this.route.navigate(['/contact']);
  }
  goToCurrency() {
    this.route.navigate(['/currency']);
  }
}
