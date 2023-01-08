import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  onClientes(){
    this.router.navigate(['']);
  }

  onCarros(){
    this.router.navigate(['carros']);
  }

  onPieces(){
    this.router.navigate(['pieces']);
  }

  onTermos(){
    this.router.navigate(['termos']);
  }

  onBudgets(){
    this.router.navigate(['budgets']);
  }
}
