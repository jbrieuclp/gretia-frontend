import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Personne } from '../../../repository/person.repository';
import { SuiveuseService } from '../suiveuse.service';

@Component({
  selector: 'app-my-s-list',
  templateUrl: './my-s-list.component.html',
  styleUrls: ['./my-s-list.component.css']
})
export class MySListComponent implements OnInit {

  constructor(private suiveuseS: SuiveuseService) {}

  user: Personne;

  ngOnInit() {
    this.user = this.suiveuseS.user;
  }
}
