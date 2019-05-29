import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-projet-add',
  templateUrl: './projet-add.component.html',
  styleUrls: ['./projet-add.component.css']
})
export class ProjetAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSaved(event) {
  	this.router.navigate(['projet', event]);
  }

}
