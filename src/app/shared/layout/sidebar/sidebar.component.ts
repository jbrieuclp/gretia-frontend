import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/auth/authentication.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	user: Observable<User>;

  constructor(
  	public layout: LayoutService,
  	private authService: AuthService
  ) { 
  	this.user = this.authService.getUser().asObservable();
  }

  ngOnInit() {

  }
}
