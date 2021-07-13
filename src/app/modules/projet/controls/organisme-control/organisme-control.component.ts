import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, startWith, tap, mergeMap, distinctUntilChanged } from 'rxjs/operators';

import { OrganismeRepository, Organisme } from '../../repository/organisme.repository';

@Component({
  selector: 'app-projet-control-organisme',
  templateUrl: './organisme-control.component.html',
  styleUrls: ['./organisme-control.component.scss']
})
export class OrganismeControlComponent implements OnInit {

	@Input() form: FormControl = new FormControl();
  $organismes: BehaviorSubject<Organisme[]> = new BehaviorSubject([]);
  filteredOptions: Observable<Organisme[]>;
  loading: boolean = false;

  get organismes(): Organisme[] {
  	return this.$organismes.getValue();
  }

  constructor(
  	private organismeR: OrganismeRepository
  ) { }

  ngOnInit() {  	
  	this.loading = true;
  	this.organismeR.organismes()
  		.pipe(
        map((data: any): Organisme[]=>data["hydra:member"]),
        tap(() => this.loading = false)
      )
  		.subscribe((organismes: Organisme[])=>this.$organismes.next(organismes));
	  
  	//Gère la selection de la valeur quand on est en mode edition
	  this.$organismes.asObservable()
	  	.pipe(
	  		distinctUntilChanged(),
	  		filter((loc: Organisme[]) => loc.length > 0),
	  		tap((loc: Organisme[]) => this.$organismes.next(loc))
	  	)
	  	.subscribe((loc: Organisme[]) => {
	  		if (this.form.value !== null && this.form.value['@id'] !== undefined) {
		      this.form.setValue(this.form.value['@id']);
		    }
	  	})

  	// selectionne automatiquement la valeur de la liste si elle correspond à une valeur existante
  	combineLatest(
  		this.form.valueChanges
	  		.pipe(
	  			startWith(''),
	  			filter(value=> !Number.isInteger(value) && value !== null),
	  			map(value => value['@id'] !== undefined ? value['@id'] : value)
	  		), 
	  	this.$organismes.asObservable()
	  )
  	.pipe(
  		map(([value, organismes])=> {
				const idx = organismes.findIndex(loc => this._removeAccent(loc.nom) === this._removeAccent(value))
				return idx > -1 ? organismes[idx]['@id'] : null;
			}),
			filter(value=> value !== null)
  	)
  	.subscribe(val=>this.form.setValue(val));
	  

  	//Gestion du filtre sur la liste de l'autocomplete
  	this.filteredOptions = combineLatest(
	  		this.form.valueChanges
	  			.pipe(
	  				startWith(''), 
	  				filter(value=>!Number.isInteger(value) && value !== null),
	  				map(value => value['@id'] !== undefined ? value['@id'] : value)
	  			), 
	  		this.$organismes.asObservable()
	  	)
      .pipe(
        map(([term, organismes]: [string, Organisme[]]) => this._filter(term)),
      );
  }

  private _filter(value: string): Organisme[] {
    const filterValue = this._removeAccent(value);

    return this.organismes.filter(loc => this._removeAccent(loc.nom).includes(this._removeAccent(value)));
  }

  private _removeAccent(value): string {
  	return ((value.toLowerCase()).trim()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  displayFn(id) {
  	if (id) {
  		const idx = this.organismes.find(loc => loc['@id'] === id);
  		return idx !== undefined ? idx.nom : '';
  	}
	}

	/**
	* Affiche le bouton d'enregistrement d'une nouvelle organisme que dans certain cas
	**/
	get buttonDisplay(): boolean {
		if (
			this.form.valid || 
			this.form.value === null || 
			this.form.value === '' || 
			this.organismes.findIndex(loc=>loc['@id'] === this.form.value) > -1) {
			return false;
		}
		return true;
	}

	addOrganisme() {
		if (this.form.value !== null && isNaN(this.form.value)) {
			this.organismeR
	      .postOrganismes({nom: this.form.value.trim()})
	      .pipe(
	      	mergeMap(
	      		organisme=> this.organismeR.organismes(),
	      		(organisme, organismes) => {
	      			return [organisme, organismes["hydra:member"]];
	      		}
	      	),
	      	tap(([organisme, organismes]: [Organisme, Organisme[]])=>this.$organismes.next(organismes)),
	      	map(([organisme, organismes]: [Organisme, Organisme[]])=>organisme)
	      )
	      .subscribe(
	        (organisme: Organisme) => this.form.setValue(organisme['@id']),
	        (err) => {
	          //this._commonService.translateToaster("error", "ErrorMessage");
	        }
	      );
		}
	}

}
