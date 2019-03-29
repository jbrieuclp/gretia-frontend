import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AuthService } from '../../auth/authentication.service';
import { LayoutService } from '../layout.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HeaderComponent implements OnInit {

	sidenavToggle: boolean;
	@Output() sidenavToggleChange: EventEmitter<boolean> = new EventEmitter();
  user: User;
  isLogged: boolean;

  constructor(private authService: AuthService, private router: Router, public layout: LayoutService) { 
  	this.sidenavToggle = true;
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this.authService.getUser()
      .subscribe(
        user => {this.user = user;}
      );
  }

  openSidenav() {
  	this.sidenavToggleChange.emit();
  }

  logout(): void {
    this.authService.logout()
    this.isLogged = false;
    this.router.navigate(['/']);
  }

}
