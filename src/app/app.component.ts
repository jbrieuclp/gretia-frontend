import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/auth/authentication.service';
import { LayoutService } from './shared/layout/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav;

  sidenavToggle:boolean;

  constructor(private authService: AuthService, private router: Router, public layout: LayoutService) { 
    this.sidenavToggle = true;
  }

  ngOnInit() { }

  sidenavToggleChange() {
  	this.sidenav.toggle();
  }

  logout() {
       //this.authService.logout();
    this.router.navigate(['home']);
  }

}
