import { Component, OnInit } from '@angular/core';
import { ProjetFinancementService } from './financement.service';

@Component({
  selector: 'app-projet-projet-financement',
  templateUrl: './financement-disp.component.html',
  styleUrls: ['./financement-disp.component.scss']
})
export class FinancementProjectComponent implements OnInit {

  get fundings(){
    return this.projetFinancementS.fundings;
  }

  get loading(): boolean {
    return this.projetFinancementS.loading;
  }
  
  constructor(
  	private projetFinancementS: ProjetFinancementService
  ) { }

  ngOnInit() {
  }

}
