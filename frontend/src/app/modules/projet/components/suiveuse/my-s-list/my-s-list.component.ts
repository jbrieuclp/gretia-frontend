import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { SuiveuseService } from '../suiveuse.service';

@Component({
  selector: 'app-my-s-list',
  templateUrl: './my-s-list.component.html',
  styleUrls: ['./my-s-list.component.css']
})
export class MySListComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private suiveuseR: SuiveuseRepository,
    private personR: PersonRepository,
    private suiveuseS: SuiveuseService
  ) { }

  addSuiveuseDisp: boolean = false;

  ngOnInit() {
    console.log(this.suiveuseS.user);
   //  if (this.suiveuseS.user )
  	// let user = this.route.snapshot.paramMap.get('person');
  	// if (user === null || user === 'ajouter') {
  	// 	this.personR.getUser().subscribe(res => {
  	// 		this.router.navigate([res.surnom], {relativeTo: this.route});
  	// 		this.addSuiveuseDisp = true;
  	// 	});
  	// } else { this.addSuiveuseDisp = true; }

    
  }

}
