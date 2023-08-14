import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  homeActive: string = '';
  matActive: string = '';
  frnsActive: string = '';
  demActive: string = '';

  @Input() active = 'home';

  checkActive (a: string) {
    this.homeActive = '';
    this.matActive = '';
    this.frnsActive = '';
    this.demActive = '';
    switch (a) {
      case 'home':
        this.homeActive = 'active';
        break;

      case 'materiel':
        this.matActive = 'active';
        break;

      case 'fournisseur':
        this.frnsActive = 'active';
        break;

      case 'demandeur':
        this.demActive = 'active';
        break;  
      default:
        break;
    }
  }
}
