import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

import { SignInDialog } from './sign-in.dialog';
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

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute, 
    public layout: LayoutService,
    public dialog: MatDialog,
  ) { 
  	this.sidenavToggle = true;
  }

  ngOnInit() {
    //recuperation de l'utilisateur + surveillance de sa deconnexion
    this.authService.getUser().asObservable()
      .subscribe(
        user => {
          this.user = user;
          console.log(this.route.parent)
          console.log(this.router.config);
          console.log(this.router.url.substr(1));
          let currentRouteConfig = this.router.config.find(f=>f.path == this.router.url.substr(1));
          console.log(currentRouteConfig);
          if (user.id === null && currentRouteConfig.canActivate != null) {
            this.openSignInDialog();
          }
        }
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

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {};
    dialogConfig.maxWidth = '500px';
    dialogConfig.width = '90%';
    dialogConfig.height = '280px';
    dialogConfig.position = {right: 'auto', left: 'auto', top: '100px'};

    const dialogRef = this.dialog
                            .open(SignInDialog, dialogConfig)
                            .afterClosed()
                              .subscribe(response => {
                                
                              });
  }

}
