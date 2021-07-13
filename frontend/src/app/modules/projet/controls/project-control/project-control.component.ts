import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, startWith, tap, mergeMap, distinctUntilChanged } from 'rxjs/operators';

import { ProjetRepository, Projet } from '../../repository/projet.repository';

@Component({
  selector: 'app-project-project-control',
  templateUrl: './project-control.component.html',
  styleUrls: ['./project-control.component.scss']
})
export class ProjectControlComponent implements OnInit {

	@Input() form: FormControl = new FormControl();
  $projects: BehaviorSubject<Projet[]> = new BehaviorSubject([]);
  filteredOptions: Observable<Projet[]>;
  loading: boolean = false;

  get projects(): Projet[] {
  	return this.$projects.getValue();
  }

  constructor(
  	private projectR: ProjetRepository
  ) { }

  ngOnInit() {  	
  	this.loading = true;
  	this.projectR.projets_select()
  		.pipe(
        map((data: any): Projet[]=>data["hydra:member"]),
        tap(() => this.loading = false)
      )
  		.subscribe((projects: Projet[])=>this.$projects.next(projects));
	  
  	//Gère la selection de la valeur quand on est en mode edition
	  this.$projects.asObservable()
	  	.pipe(
	  		distinctUntilChanged(),
	  		filter((project: Projet[]) => project.length > 0),
	  		tap((project: Projet[]) => this.$projects.next(project))
	  	)
	  	.subscribe((loc: Projet[]) => {
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
	  	this.$projects.asObservable()
	  )
  	.pipe(
  		map(([value, projects])=> {
				const idx = projects.findIndex(project=>this._removeAccent(project.intitule) === this._removeAccent(value))
				return idx > -1 ? projects[idx]['@id'] : null;
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
	  		this.$projects.asObservable()
	  	)
      .pipe(
        map(([term, projects]: [string, Projet[]]) => this._filter(term)),
      );
  }

  private _filter(value: string): Projet[] {
    const filterValue = this._removeAccent(value);

    return this.projects.filter(project => this._removeAccent(project.intitule).includes(this._removeAccent(value)));
  }

  private _removeAccent(value): string {
  	return ((value.toLowerCase()).trim()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  displayFn(id) {
  	if (id) {
  		const idx = this.projects.find(project => project['@id'] === id);
  		return idx !== undefined ? idx.intitule : '';
  	}
	}

}
